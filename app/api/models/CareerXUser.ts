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
 * @interface CareerXUser
 */
export interface CareerXUser {
    /**
     * 
     * @type {number}
     * @memberof CareerXUser
     */
    readonly id: number;
    /**
     * 
     * @type {number}
     * @memberof CareerXUser
     */
    career: number;
    /**
     * 
     * @type {number}
     * @memberof CareerXUser
     */
    user: number;
}

/**
 * Check if a given object implements the CareerXUser interface.
 */
export function instanceOfCareerXUser(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "career" in value;
    isInstance = isInstance && "user" in value;

    return isInstance;
}

export function CareerXUserFromJSON(json: any): CareerXUser {
    return CareerXUserFromJSONTyped(json, false);
}

export function CareerXUserFromJSONTyped(json: any, ignoreDiscriminator: boolean): CareerXUser {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'career': json['career'],
        'user': json['user'],
    };
}

export function CareerXUserToJSON(value?: CareerXUser | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'career': value.career,
        'user': value.user,
    };
}
