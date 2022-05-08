namespace StoreAPI.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string Searchterm { get; set; }

        public string Types { get; set; }
        public string Brands { get; set; }



    }
}
