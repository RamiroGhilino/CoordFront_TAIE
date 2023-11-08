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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PatchedCareerXAreaRequest
 */
export interface PatchedCareerXAreaRequest {
    /**
     * 
     * @type {number}
     * @memberof PatchedCareerXAreaRequest
     */
    career?: number;
    /**
     * 
     * @type {number}
     * @memberof PatchedCareerXAreaRequest
     */
    area?: number;
}

/**
 * Check if a given object implements the PatchedCareerXAreaRequest interface.
 */
export function instanceOfPatchedCareerXAreaRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchedCareerXAreaRequestFromJSON(json: any): PatchedCareerXAreaRequest {
    return PatchedCareerXAreaRequestFromJSONTyped(json, false);
}

export function PatchedCareerXAreaRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedCareerXAreaRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'career': !exists(json, 'career') ? undefined : json['career'],
        'area': !exists(json, 'area') ? undefined : json['area'],
    };
}

export function PatchedCareerXAreaRequestToJSON(value?: PatchedCareerXAreaRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'career': value.career,
        'area': value.area,
    };
}
