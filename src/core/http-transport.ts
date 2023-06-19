const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

function queryStringify(data: Record<string, unknown>) {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }

    let queryString = "?";
    Object.entries(data).forEach(([key, value], index) => {
        if (index === 0) {
            queryString += `${key}=${value}`;
        } else {
            queryString += `&${key}=${value}`;
        }
    });
    return queryString;
}

interface Options {
    method: string;
    headers: Record<string, string>;
    data: Record<string, unknown>;
    timeout: number;
}
class HTTPTransport {
    get = (url: string, options: Partial<Options> = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.GET },
            options.timeout
        );
    };

    post = (url: string, options: Partial<Options> = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };

    put = (url: string, options: Partial<Options> = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };

    delete = (url: string, options: Partial<Options> = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    request = (
        url: string,
        options: Partial<Omit<Options, "timeout">> = {},
        timeout = 5000
    ) => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject(new Error("No method"));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            );

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

const coolFetch = new HTTPTransport();
export default coolFetch;
