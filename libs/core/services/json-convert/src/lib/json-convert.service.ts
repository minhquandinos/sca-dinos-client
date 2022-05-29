import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer/types/interfaces';
import { JsonConvert } from 'json2typescript';

const jsonConvert: JsonConvert = new JsonConvert();
// jsonConvert.operationMode = OperationMode.DISABLE; // print some debug data
// jsonConvert.ignorePrimitiveChecks = true; // don't allow assigning number to string etc.
// jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_OBJECT_NULL;
// jsonConvert.ignoreRequiredCheck = true;

@Injectable({
    providedIn: 'root'
})
export class JsonConvertService {
    private jsonConvert: JsonConvert = jsonConvert;

    /*
     * @deprecated please use mapper method
     *
     * */
    mapperArray<T>(array: any[], classReference: any): T[] {
        let newArray: T[];
        try {
            newArray = this.jsonConvert.deserializeArray(array, classReference);
        } catch (e) {
            console.log(<Error>e);
        }

        return newArray;
    }

    /*
     * @deprecated please use mapper method
     *
     * */
    mapperObject<T>(object: any, classReference: any): T {
        let newObject: T;
        try {
            newObject = this.jsonConvert.deserializeObject(object, classReference);
        } catch (e) {
            console.log(<Error>e);
        }

        return newObject;
    }

    // TODO fixed generic type
    mapper<T = any, V extends any = any, R = any>(
        cls: ClassConstructor<T>,
        plain: V | any,
        toClassOptions: ClassTransformOptions = { excludeExtraneousValues: true },
        toObjectOptions: ClassTransformOptions = {
            excludePrefixes: ['_']
        }
    ): R {
        let mapper: Record<string, any> | Record<string, any>[];
        try {
            const mapperClass: T | T[] = plainToClass<T, V>(cls, plain, toClassOptions);
            mapper = classToPlain<T>(mapperClass, toObjectOptions);
        } catch (e) {
            console.log(<Error>e);
        }

        return mapper as R;
    }
}
