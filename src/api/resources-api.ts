import HttpTransport from "../core/http-transport.ts";
import { Resource } from "../core/types.ts";

export class ResourcesApi {
    private http: HttpTransport = new HttpTransport("/resources");

    uploadFile(data: FormData): Promise<Resource> {
        return this.http.post("", { data });
    }
}

export default new ResourcesApi();
