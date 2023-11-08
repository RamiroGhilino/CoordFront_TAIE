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
 * @interface UserXRoleRequest
 */
export interface UserXRoleRequest {
    /**
     * 
     * @type {number}
     * @memberof UserXRoleRequest
     */
    user: number;
    /**
     * 
     * @type {number}
     * @memberof UserXRoleRequest
     */
    role: number;
}

/**
 * Check if a given object implements the UserXRoleRequest interface.
 */
export function instanceOfUserXRoleRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "role" in value;

    return isInstance;
}

export function UserXRoleRequestFromJSON(json: any): UserXRoleRequest {
    return UserXRoleRequestFromJSONTyped(json, false);
}

export function UserXRoleRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserXRoleRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user': json['user'],
        'role': json['role'],
    };
}

export function UserXRoleRequestToJSON(value?: UserXRoleRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': value.user,
        'role': value.role,
    };
}
