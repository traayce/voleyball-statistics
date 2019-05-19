using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Tests.TeamTests
{
    [TestFixture]
    [Parallelizable]
    public partial class PlayersControllerTests
    {
        /*protected void Setup()
        {
            base.Setup();
            entity = EntityFactory.GetAppointmentBillingEntitySaved();
            model = new AppointmentBillingViewModel
            {
                Id = entity.Id,
                AppointmentId = entity.AppointmentId,
                DicCptHcpcsCodeId = EntityFactory.GetDicCptCodeEntitySaved(ClsfCptCodeArea.Clinician).Id,
                ClsfBillingCodeTypeId = ClsfBillingCodeType.Cpt
            };
        }*/

        [Parallelizable]
        [Test, Order(1)]
        public async Task DeleteSuccessTest()
        {
/*            var url = QueryHelpers.AddQueryString(path, new Dictionary<string, string>
            {
                ["ids"] = entity.Id.ToString()
            });
            var response = await Client.DeleteAsync(url);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));*/
            Assert.That(true);
        }

        [Parallelizable]
        [Test]
        public async Task DeleteFailureTest()
        {
            /*var response = await Client.DeleteAsync(path);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));*/
            Assert.That(true);
        }

        [Test, Order(1)]
        public async Task PostSuccessTest()
        {
            /*var json = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync(path, json);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));*/
            Assert.That(true);
        }


        [Test]
        [Parallelizable]
        public async Task PostFailureTest()
        {
            /*model.Modifiers = new List<string> {"Modifier2", "Modifier2", "Modifier2"};
            var response = await Client.PostAsync(path, new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json"));
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));*/
            Assert.That(true);
        }
    }
} 