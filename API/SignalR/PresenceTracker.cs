using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();
    
        public Task<bool> UserConnected(string username, string connectionId) {
            bool isOnLine = false;

            lock(OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(username)) 
                {
                    OnlineUsers[username].Add(connectionId);
                }
                else
                {
                    OnlineUsers.Add(username, new List<string>{connectionId});
                    isOnLine = true; // user has indeed just connected
                }
            }
            return Task.FromResult(isOnLine);
        }

        public Task<bool> UserDisconnected(string username, string connectionId)
        {
            bool isOffLine = false;

            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(username)) return Task.FromResult(isOffLine);

                OnlineUsers[username].Remove(connectionId);
                if (OnlineUsers[username].Count == 0)
                {
                    OnlineUsers.Remove(username);
                    isOffLine = true;
                }
            }

            return Task.FromResult(isOffLine);
        }

        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock (OnlineUsers)
            {
                onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }

            return Task.FromResult(onlineUsers);
        }

        public Task<List<string>> GetConnectionsForUser(string username)
        {
            List<string> connectionIds;
            lock(OnlineUsers)
            {
                connectionIds = OnlineUsers.GetValueOrDefault(username); // will return null if none exist
            };
            return Task.FromResult(connectionIds);
        }
    }
}