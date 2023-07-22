import { assert } from "chai";
import sinon, {
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport from "./http-transport.ts";

describe("HTTP Transport", () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;
        class FormData {
            public data: Record<string, string> = {};
            public set(name: string, value: string) {
                this.data[name] = value;
            }
        }
        // @ts-ignore
        global.FormData = FormData;

        xhr.onCreate = (req) => {
            requests.push(req);
        };

        instance = new HTTPTransport("/mock");
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    it("method get should send GET request", () => {
        instance.get("/");
        const [request] = requests;
        assert.equal(request.method, "GET");
    });
    it("construct right url", () => {
        instance.get("/user");
        const [request] = requests;
        assert.equal(request.url, "https://ya-praktikum.tech/api/v2/mock/user");
    });
    it("construct right query params for GET request", () => {
        const data = { login: "login", password: "password" };
        instance.get("/user", {
            data,
        });
        const [request] = requests;
        assert.equal(
            request.url,
            "https://ya-praktikum.tech/api/v2/mock/user?login=login&password=password",
        );
    });
    it("correctly send POST request", () => {
        const data = { login: "login", password: "password" };
        instance.post("/user", {
            data,
        });
        const [request] = requests;
        assert.equal(
            request.requestBody,
            '{"login":"login","password":"password"}',
        );
        assert.equal(
            JSON.stringify(request.requestHeaders),
            '{"Content-Type":"application/json;charset=utf-8"}',
        );
    });
    it("correctly send FormData request", () => {
        const data = new FormData();
        data.set("login", "login");
        data.set("password", "password");
        instance.post("/user", {
            data,
        });
        const [request] = requests;
        assert.equal(
            JSON.stringify(request.requestBody),
            '{"data":{"login":"login","password":"password"}}',
        );
    });
});
