namespace GreentableApi.Models.Response
{
    public class Authresponse
    {
        public virtual Users User { get; set; }

        public string Token { get; set; }
        public string Success { get; set; }
    }
}