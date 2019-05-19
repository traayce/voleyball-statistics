using System.Threading.Tasks;
using NUnit.Framework;

namespace Tests.MatchesTests.PlayerPointsTests
{
    [TestFixture]
    [Parallelizable]
    public class MatchPointsControllerTests
    {
        [Test, Order(1)]
        public async Task PostSuccessTesaaat()
        {
            Assert.That(true);
        }
        
        [Test, Order(1)]
        public async Task PostSucceassTest()
        {
            Assert.That(true);
        }

        [Test]
        [Parallelizable]
        public async Task PostFailureTest()
        {
            Assert.That(true);
        }
    }
} 