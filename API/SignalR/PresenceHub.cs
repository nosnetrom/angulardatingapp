using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker _tracker;
        public PresenceHub(PresenceTracker tracker)
        {
            _tracker = tracker;
        }
        public override async Task OnConnectedAsync()
        {
            var isOnline = await _tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
            
            if (isOnline)
            {
                // Others = clients other than the one coming online
                // UserIsOnline = name of method to be used client side
                // We have Context and token, and can access user props
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());
            }

            var currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            var isOffline = await _tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);
            
            if (isOffline)
            {
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());
            }
            
            await base.OnDisconnectedAsync(ex); // pass exception up to base class
        }
    }
}