const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { request } = require('../app')
const { json } = require('body-parser')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
      //пользователь существует
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password) // Будем сравнивать пароли в синхронном режиме
      if (passwordResult) {
        //Генерация токена, пароли совпали
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: 60 * 60})  //Время жизни токена - 1 час

        res.status(200).json({
          token: `Bearer ${token}`
        })

      } else {
        // Пароли не совпали в базе
        res.status(401).json({    //401 Unauthorise
          message: 'Пароли не совпадают, попробуйте снова.'
        })  
      }

    } else {
      //пользователя нет,ошибка
      res.status(404).json({
        message: 'Пользовательс таким email Не найден'
      })
    }
}

module.exports.register = async function(req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email})
  
    if (candidate) {
      // Пользователь существует, нужно отправить ошибку
      res.status(409).json({
        message: 'Такой email уже занят. Попробуйте другой.'
      })
    } else {
      // Нужно создать пользователя
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
      })
  
      try {
        await user.save()
        res.status(201).json(user)
      } catch(e) {
        // Обработать ошибку
        errorHandler(res, e)
      }
  
    }
  }