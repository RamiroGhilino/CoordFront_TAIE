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
 * @interface PatchedTutorshipReportRequest
 */
export interface PatchedTutorshipReportRequest {
    /**
     * 
     * @type {string}
     * @memberof PatchedTutorshipReportRequest
     */
    comment?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedTutorshipReportRequest
     */
    subject?: string;
    /**
     * 
     * @type {number}
     * @memberof PatchedTutorshipReportRequest
     */
    tutorshipInstance?: number;
    /**
     * 
     * @type {number}
     * @memberof PatchedTutorshipReportRequest
     */
    tutorUser?: number;
}

/**
 * Check if a given object implements the PatchedTutorshipReportRequest interface.
 */
export function instanceOfPatchedTutorshipReportRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchedTutorshipReportRequestFromJSON(json: any): PatchedTutorshipReportRequest {
    return PatchedTutorshipReportRequestFromJSONTyped(json, false);
}

export function PatchedTutorshipReportRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedTutorshipReportRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
        'subject': !exists(json, 'subject') ? undefined : json['subject'],
        'tutorshipInstance': !exists(json, 'tutorship_instance') ? undefined : json['tutorship_instance'],
        'tutorUser': !exists(json, 'tutor_user') ? undefined : json['tutor_user'],
    };
}

export function PatchedTutorshipReportRequestToJSON(value?: PatchedTutorshipReportRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'comment': value.comment,
        'subject': value.subject,
        'tutorship_instance': value.tutorshipInstance,
        'tutor_user': value.tutorUser,
    };
}
