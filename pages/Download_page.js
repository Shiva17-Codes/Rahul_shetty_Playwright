
class download_product{
    constructor(page)
    {
        this.page=page;
        this.download_csv=page.locator('button[class="btn btn-primary mt-3 mb-3"]');
    }

    async download_file()
    {
        await this.download_csv.click();
    }


}
module.exports={download_product}