var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSignalR();

// Configure HTTP request pipeline
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

// Delete this: app.UseRouting();

app.UseCors(x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials() // To accommodate the wy SignalR passes access tokens
    .WithOrigins("https://localhost:4200"));

app.UseAuthentication(); 

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

// Delete endpoints wrapper; instead of referring to endpoints, use app
//app.UseEndpoints(endpoints =>
//{
    app.MapControllers();
    app.MapHub<PresenceHub>("hubs/presence");
    app.MapHub<MessageHub>("hubs/message");
    app.MapFallbackToController("Index", "Fallback");
//});

// Need to seed data, etc.; reuse Main() method, except final await host.RunAsync();
// Remove this:  var host = CreateHostBuilder(args).Build();
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try 
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

// Reinsert...
await app.RunAsync();

