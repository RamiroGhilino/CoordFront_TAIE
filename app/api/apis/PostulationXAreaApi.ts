/* tslint:disable */
/* eslint-disable */
/**
 * Turnero TAIE API
 * API correspondiente al trabajo final \"Turnero TAIE\", realizado por los alumnos Juan Manuel Villarreal y Ghilino Ramiro
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PatchedPostulationXAreaRequest,
  PostulationXArea,
  PostulationXAreaRequest,
} from '../models/index';
import {
    PatchedPostulationXAreaRequestFromJSON,
    PatchedPostulationXAreaRequestToJSON,
    PostulationXAreaFromJSON,
    PostulationXAreaToJSON,
    PostulationXAreaRequestFromJSON,
    PostulationXAreaRequestToJSON,
} from '../models/index';

export interface PostulationXAreaCreateRequest {
    postulationXAreaRequest: PostulationXAreaRequest;
}

export interface PostulationXAreaDestroyRequest {
    id: number;
}

export interface PostulationXAreaPartialUpdateRequest {
    id: number;
    patchedPostulationXAreaRequest?: PatchedPostulationXAreaRequest;
}

export interface PostulationXAreaRetrieveRequest {
    id: number;
}

export interface PostulationXAreaUpdateRequest {
    id: number;
    postulationXAreaRequest: PostulationXAreaRequest;
}

/**
 * 
 */
export class PostulationXAreaApi extends runtime.BaseAPI {

    /**
     */
    async postulationXAreaCreateRaw(requestParameters: PostulationXAreaCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostulationXArea>> {
        if (requestParameters.postulationXAreaRequest === null || requestParameters.postulationXAreaRequest === undefined) {
            throw new runtime.RequiredError('postulationXAreaRequest','Required parameter requestParameters.postulationXAreaRequest was null or undefined when calling postulationXAreaCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PostulationXAreaRequestToJSON(requestParameters.postulationXAreaRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostulationXAreaFromJSON(jsonValue));
    }

    /**
     */
    async postulationXAreaCreate(requestParameters: PostulationXAreaCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostulationXArea> {
        const response = await this.postulationXAreaCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async postulationXAreaDestroyRaw(requestParameters: PostulationXAreaDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling postulationXAreaDestroy.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async postulationXAreaDestroy(requestParameters: PostulationXAreaDestroyRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postulationXAreaDestroyRaw(requestParameters, initOverrides);
    }

    /**
     */
    async postulationXAreaListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PostulationXArea>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PostulationXAreaFromJSON));
    }

    /**
     */
    async postulationXAreaList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PostulationXArea>> {
        const response = await this.postulationXAreaListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async postulationXAreaPartialUpdateRaw(requestParameters: PostulationXAreaPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostulationXArea>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling postulationXAreaPartialUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: PatchedPostulationXAreaRequestToJSON(requestParameters.patchedPostulationXAreaRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostulationXAreaFromJSON(jsonValue));
    }

    /**
     */
    async postulationXAreaPartialUpdate(requestParameters: PostulationXAreaPartialUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostulationXArea> {
        const response = await this.postulationXAreaPartialUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async postulationXAreaRetrieveRaw(requestParameters: PostulationXAreaRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostulationXArea>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling postulationXAreaRetrieve.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostulationXAreaFromJSON(jsonValue));
    }

    /**
     */
    async postulationXAreaRetrieve(requestParameters: PostulationXAreaRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostulationXArea> {
        const response = await this.postulationXAreaRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async postulationXAreaUpdateRaw(requestParameters: PostulationXAreaUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PostulationXArea>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling postulationXAreaUpdate.');
        }

        if (requestParameters.postulationXAreaRequest === null || requestParameters.postulationXAreaRequest === undefined) {
            throw new runtime.RequiredError('postulationXAreaRequest','Required parameter requestParameters.postulationXAreaRequest was null or undefined when calling postulationXAreaUpdate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("jwtAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/postulation-x-area/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PostulationXAreaRequestToJSON(requestParameters.postulationXAreaRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PostulationXAreaFromJSON(jsonValue));
    }

    /**
     */
    async postulationXAreaUpdate(requestParameters: PostulationXAreaUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PostulationXArea> {
        const response = await this.postulationXAreaUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}