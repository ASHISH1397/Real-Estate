import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "failed to get Users"})
    }
}
export const getUser = async (req, res) => {
    const id = req.params.id
    try{
        const user = await prisma.user.findUnique({
            where: {id}
        })
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "failed to get the User"})
    }
}
export const updateUser = async (req,res) => {
    const id = req.params.id
    const tokenUserId = req.userId
    const {password,avatar,...inputs} = req.body   // seperating password to hash (bcrypt)

    let updatedPassword = null
    if(id != tokenUserId){
        res.status(403).json({message: "unauthorized to update profile"})
    }
    try{
        if(password){
            updatedPassword = await bcrypt.hash(password,10)
        }
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            }
        })
        res.status(200).json(updatedUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "failed to Update user"})
    }
}
export const deleteUser = async (req,res) => {
    const id = req.params.id
    const tokenUserId = req.userId

    let updatedPassword = null
    if(id != tokenUserId){
        res.status(403).json({message: "unauthorized to update profile"})
    }
    try{
        await prisma.user.delete({
            where: {id}
        })
        res.status(200).json({ message : "User deleted."})

    } catch (err) {
        console.log(err)
        res.status(500).json({message: "failed to delete user"})
    }
}
