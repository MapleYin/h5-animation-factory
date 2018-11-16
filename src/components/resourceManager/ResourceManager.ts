/**
 * Copyright © 2018 Maple Yin. All rights reserved.
 *
 * Source Manager
 *
 * @summary Source Manager
 * @author Maple Yin <i@maple.im>
 *
 * Created at     : 2018-11-06 16:03:02 
 * Last modified  : 2018-11-06 22:50:14
 */

const COS = require('cos-js-sdk-v5')
const Bucket = 'h5-1257141638'
const Region = 'ap-beijing'

// const Host = 'https://h5-1257141638.cos.ap-beijing.myqcloud.com'
const Host = 'https://h5-1257141638.picbj.myqcloud.com'



export interface ImageItem {
    name: string
    url: string
}

export class ResourceManager {
    readonly cos = new COS({
        SecretId: 'AKIDd7QZWHHEQWQ8eyD1lJfpnY7TdbNx2Xs2',
        SecretKey: '6NVTFoCONAl9QVO5at0wiI8oIahdMtDM',
    })
    constructor() {
        
    }

    
    /**
     * Image list that can use
     * 
     * @returns {Promise<string[]>}
     * 
     * @memberOf ResourceManager
     */
    fileList(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject)=>{
            this.cos.getBucket({
                Bucket: Bucket, 
                Region: Region,
            }, function(err: any, data: any) {
                if (err) {
                    reject(err)
                } else {
                    let listImage = data.Contents.map((item: any)=>{
                        return `${Host}/${item.Key}`
                    })
                    resolve(listImage)
                }
            });
        })
    }


    
    /**
     * Upload image
     * 
     * @param {File} file file to upload
     * @param {(progressData: any)=>void} [progress] upload progress callback
     * @returns {Promise<string>} 
     * 
     * @memberOf ResourceManager
     */
    upload(file: File, progress?: (progressData: any)=>void): Promise<string> {
        return new Promise<string>((resolve, reject)=>{
            this.cos.putObject({
                Bucket: Bucket,
                Region: Region,
                Key: file.name,
                StorageClass: 'STANDARD',
                Body: file,
                onProgress: function(progressData: any) {
                    if(progress) {
                        progress(progressData)
                    }
                }
            }, (err: any, data: any)=>{
                if(err || data.statusCode != 200) {
                    reject(err)
                } else {
                    resolve(`${Host}/${file.name}`)
                }
            })
        })
    }
}