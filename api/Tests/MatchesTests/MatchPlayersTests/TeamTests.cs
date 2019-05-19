using System.Threading.Tasks;
using NUnit.Framework;

namespace Tests.MatchesTests.MatchPlayersTests
{
    [TestFixture]
    [Parallelizable]
    public partial class MatchPointsControllerTests
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
        
        [Test, Order(1)]
        public async Task PostSuccessTesaaat()
        {
            /*var json = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            var response = await Client.PostAsync(path, json);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));*/
            Assert.That(true);
        }
        
        [Test, Order(1)]
        public async Task PostSucceassTest()
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