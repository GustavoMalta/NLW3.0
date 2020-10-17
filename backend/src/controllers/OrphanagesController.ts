import { getRepository } from "typeorm";
import Orphanage from '../models/Orphanage';
import { Response, Request } from "express";
import OrphanagesView from "../views/orphanages_view";
import orphanages_view from "../views/orphanages_view";
import * as Yup from 'yup';
export default {
     async create(request:Request, response:Response){
        const {   
            name,    
            latitude,    
            longitude,    
            about,    
            instructions,    
            open_on_weekends,    
            opening_hours} = request.body
        
        const requestImages = request.files as Express
            .Multer.File[]
        
        const  images = requestImages.map(item =>{
            return {path: item.filename}
        }) 

        const orphanagesRepository = getRepository(Orphanage)

        const data = {
            name,    
            latitude,    
            longitude,    
            about,    
            instructions,    
            open_on_weekends: open_on_weekends === 'true',    
            opening_hours,
            images
            }
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),  
            latitude: Yup.number().required('Latitude é obrigatório'),    
            longitude: Yup.number().required('Longitude é obrigatório'),    
            about: Yup.string().required('Sobre é obrigatório').max(300),    
            instructions: Yup.string().required('instruções é obrigatório'),    
            open_on_weekends: Yup.boolean().required('open_on_weekends é obrigatório'),    
            opening_hours:Yup.string().required('opening_hour é obrigatório'),
            images: Yup.array(Yup.object().shape({
                path:Yup.string().required('path é obrigatório')
            }))
        })

        await schema.validate(data,{abortEarly:false})
         
        const orphanage = orphanagesRepository.create(data)
            await orphanagesRepository.save(orphanage)
        
        
            return response.status(201).json(orphanage)
     },

     async index(request:Request, response:Response){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations:['images']
        })

        return response.status(201).json(orphanages_view.renderMany(orphanages))

     },

     async show(request:Request, response:Response){
        const { id } = request.params
        try {
            const orphanagesRepository = getRepository(Orphanage)

            const orphanage = await orphanagesRepository.findOneOrFail(id,{
                relations:['images']
            })

            return response.status(201).json(orphanages_view.render(orphanage))
        } catch (error) {
            return response.status(201).json({message: error.message})
        }

     }
}