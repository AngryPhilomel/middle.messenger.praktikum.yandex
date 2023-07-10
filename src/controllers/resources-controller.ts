import API, { ResourcesApi } from "../api/resources-api.ts";

export class ResourcesController {
    private api: ResourcesApi = API;

    public async uploadFile(data: FormData) {
        try {
            return await this.api.uploadFile(data);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export default new ResourcesController();
