import axios from 'axios';
import * as types from './mutation-types';
import uuidv4 from 'uuid/v4';
const actions = {
    // 数据初始化
    initialData ({commit, state}) {
        axios.get('/api/todos')
        .then( (res) => {
            console.log('initData = ', res.data);
            commit(types.GET_BASE_DATA, res.data);
        })
        .catch( (err) => {
            console.log('initErr = ', err);
        })  
    },
    // 添加todo
    addTodo ({commit, state}, val) {
        const todo = {
            id: uuidv4(),
            text: val
        }
        axios.post('/api/addTodo', todo)
            .then( (res) => {
                console.log('addRes = ', res);
                commit(types.ADD_TODO, todo);
            })
            .catch( (err) => {
                console.log('addErr = ', err);
            })
    },
    // 根据id删除todo
    deleteTodo ({commit, state}, id) {
        axios.post('/api/deleteTodo', {
            id: id
        }) 
            .then( (res) => {
                console.log('deleteRes = ', res);
                commit(types.DELETE_TODO, id);
            })
            .catch( (err) => {
                console.log('deleteErr = ', err);
            })
        
    }
}

export default actions; 