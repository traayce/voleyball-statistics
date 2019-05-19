using System.Net.Http;
using Api;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace Tests
{
    public class TestCommonBase
    {
        public static HttpClient Client { get; set; }

        public TestCommonBase()
        {
            if (Client == null)
            {
                var api = Program.CreateWebHostBuilder(null);
                Client = new TestServer(api).CreateClient();   
            }
        }
    }
} 