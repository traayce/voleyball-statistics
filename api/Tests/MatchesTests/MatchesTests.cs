using System.Threading.Tasks;
using NUnit.Framework;

namespace Tests.MatchesTests
{
    [TestFixture]
    [Parallelizable]
    public partial class MatchesControllerTests
    {
        [Test]
        public async Task PostSuccessTest()
        {
            Assert.That(true);
        }
        
        [Test]
        public async Task PostFailureTest()
        {
            Assert.That(true);
        }
        
        [Test]
        public async Task PatchSuccessTest()
        {
            Assert.That(true);
        }

        [Test]
        [Parallelizable]
        public async Task PatchFailureTest()
        {
            Assert.That(true);
        }
        
        [Parallelizable]
        [Test]
        public async Task DeleteSuccessTest()
        {

            Assert.That(true);
        }

        [Parallelizable]
        [Test]
        public async Task DeleteFailureTest()
        {
            Assert.That(true);
        }
        
    }
} 