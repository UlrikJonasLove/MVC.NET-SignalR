using Microsoft.AspNetCore.SignalR;

namespace SignalRProjects.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalConnections { get; set; } = 0;

        public override Task OnConnectedAsync()
        {
            TotalConnections++;
            Clients.All.SendAsync("updateTotalConnections", TotalConnections).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalConnections--;
            Clients.All.SendAsync("updateTotalConnections", TotalConnections).GetAwaiter().GetResult();            
            return base.OnDisconnectedAsync(exception);
        }

        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
        }
    }
}
