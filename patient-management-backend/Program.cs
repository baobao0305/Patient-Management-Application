public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Cấu hình dịch vụ xác thực
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = "https://login.microsoftonline.com/82d7e636-d2ad-40b6-aca0-056b7b1711f2";
                options.Audience = "api://0c7431bf-22c7-4b35-9873-b9d263198030";
            });

        builder.Services.AddAuthorization();
        builder.Services.AddControllers();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();

        app.UseAuthentication(); // Phải có dòng này
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
