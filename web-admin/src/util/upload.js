import axios from 'axios'

function upload(path, userForm) {
    // 将表单数据分成多份依次传递
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    return axios.post(path, params, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data)
}

export default upload