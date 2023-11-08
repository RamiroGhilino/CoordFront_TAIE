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
 * @interface UserXTutorshipInstanceXRole
 */
export interface UserXTutorshipInstanceXRole {
    /**
     * 
     * @type {number}
     * @memberof UserXTutorshipInstanceXRole
     */
    readonly id: number;
    /**
     * 
     * @type {number}
     * @memberof UserXTutorshipInstanceXRole
     */
    user: number;
    /**
     * 
     * @type {number}
     * @memberof UserXTutorshipInstanceXRole
     */
    tutorshipInstance: number;
    /**
     * 
     * @type {number}
     * @memberof UserXTutorshipInstanceXRole
     */
    role: number;
}

/**
 * Check if a given object implements the UserXTutorshipInstanceXRole interface.
 */
export function instanceOfUserXTutorshipInstanceXRole(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "tutorshipInstance" in value;
    isInstance = isInstance && "role" in value;

    return isInstance;
}

export function UserXTutorshipInstanceXRoleFromJSON(json: any): UserXTutorshipInstanceXRole {
    return UserXTutorshipInstanceXRoleFromJSONTyped(json, false);
}

export function UserXTutorshipInstanceXRoleFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserXTutorshipInstanceXRole {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'user': json['user'],
        'tutorshipInstance': json['tutorship_instance'],
        'role': json['role'],
    };
}

export function UserXTutorshipInstanceXRoleToJSON(value?: UserXTutorshipInstanceXRole | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': value.user,
        'tutorship_instance': value.tutorshipInstance,
        'role': value.role,
    };
}
