import axios from "axios"
import { env } from "../utilities/Environment"
import { LoginModel } from "../models/Login"
import { ExistsQuizModel, QuicesResponseModel, QuizModel } from "../models/Quices"
import { QuestionsResponseModel } from "../models/Questions"
import { AnswerModel, AnswersGetModel } from "../models/Answers"

const API = env('GENIALITY_ENDPOINT')

const headers = {
    'Content-Type': 'application/json'
}


export const getQuices = async (): Promise<QuicesResponseModel> => {

    try {
        var response = await axios.get(API + 'quices', { headers: headers })
        return response.data[0];

    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const getQuicesByUser = async (user_id:number): Promise<QuicesResponseModel> => {

    try {
        var response = await axios.get(API + 'quices/user/'+user_id, { headers: headers })
        return response.data[0];

    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const getQuestionsByQuiz = async (id:number): Promise<QuestionsResponseModel> => {

    try {
        var response = await axios.get(API + 'quiz/'+id+'/questions', { headers: headers })
        return response.data[0];

    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const login = async (body: Object): Promise<LoginModel> =>{
    try {
        const response = await axios.post(API + 'user', body, { headers: headers });
        console.log(response); // Verifica la respuesta aquí
        return response.data[0];
    } catch (error: any) {
        console.error(error); // Muestra cualquier error en la consola
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const createQuiz = async (): Promise<QuizModel> =>{
    try {
        const response = await axios.post(API + 'quiz/create', {}, { headers: headers });
        console.log(response); // Verifica la respuesta aquí
        return response.data[0];
    } catch (error: any) {
        console.error(error); // Muestra cualquier error en la consola
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const processAnswers = async (body: Object): Promise<AnswerModel> =>{
    try {
        const response = await axios.post(API + 'answers', body, { headers: headers });
        console.log(response); // Verifica la respuesta aquí
        return response.data[0];
    } catch (error: any) {
        console.error(error); // Muestra cualquier error en la consola
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const processUpdateAnswers = async (body: Object): Promise<AnswerModel> =>{
    try {
        const response = await axios.put(API + 'answers', body, { headers: headers });
        console.log(response); // Verifica la respuesta aquí
        return response.data[0];
    } catch (error: any) {
        console.error(error); // Muestra cualquier error en la consola
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const getAnswersByQuiz = async (id:number): Promise<AnswersGetModel> => {

    try {
        var response = await axios.get(API + 'quiz/'+id+'/answers', { headers: headers })
        return response.data[0];

    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const deleteUserQuiz = async (quiz_id: number, user_id: number): Promise<AnswerModel> =>{
    try {
        const response = await axios.delete(API + 'quiz/'+quiz_id+'/user/'+user_id, { headers: headers });
        console.log(response); // Verifica la respuesta aquí
        return response.data[0];
    } catch (error: any) {
        console.error(error); // Muestra cualquier error en la consola
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}


export const existsQuizForUser = async (quiz_id:number, user_id: number): Promise<ExistsQuizModel> => {

    try {
        var response = await axios.get(API + 'quiz/'+quiz_id+'/user/'+user_id, { headers: headers })
        return response.data[0];

    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 500)) {
            return error.response.data[0];
        } else {
            throw error;
        }
    }
}