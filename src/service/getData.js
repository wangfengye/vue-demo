import fetch from '../config/fetch'

import * as resume from './tempdata/resume'
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}
var getResumeStyle = () => setpromise(resume.style);
var getResumeContent=()=>setpromise(resume.content);
export {
    getResumeStyle,
    getResumeContent
}