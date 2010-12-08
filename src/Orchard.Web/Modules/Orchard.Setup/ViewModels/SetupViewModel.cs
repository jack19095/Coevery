using Orchard.Setup.Annotations;

namespace Orchard.Setup.ViewModels {
    public class SetupViewModel  {
        public SetupViewModel() {
            DatabaseOptions = true;
        }

        [SiteNameValid(maximumLength: 70)]
        public string SiteName { get; set; }
        [UserNameValid(minimumLength: 3, maximumLength: 25)]
        public string AdminUsername { get; set; }
        [PasswordValid(minimumLength: 6, maximumLength: 50)]
        public string AdminPassword { get; set; }
        [PasswordConfirmationRequired]
        public string ConfirmPassword { get; set; }
        public bool DatabaseOptions { get; set; }
        [SqlDatabaseConnectionString]
        public string DatabaseConnectionString { get; set; }
        public string DatabaseTablePrefix { get; set; }
        public bool DatabaseIsPreconfigured { get; set; }
    }
}