import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import { env } from '~/config/environment'
import { usersModel } from '~/models/usersModel'
import { JWTProvider } from '~/providers/jwtProvider'
import { usersService } from '~/services/usersService'
import { comparePassword, hashPassword } from '~/utils/algorithms'
import ApiError from '~/utils/ApiError'

const register = async (req, res) => {
  try {
    const resRegister = await usersService.register(req.body)
    if (!resRegister) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Register failed' })
    }

    return res.status(StatusCodes.OK).json(resRegister)
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}


const login = async (req, res) => {
  try {
    const resLogin = await usersService.login(req.body)
    if (!resLogin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Your username or password is incorrect!' })
    }
    const password = req.body.password
    // const hashedPassword = resLogin.password
    // const resComparePassword = await comparePassword(password, hashedPassword)
    // if (!resComparePassword) {
    //   res.status(StatusCodes.BAD_REQUEST).json({ message: 'Your username or password is incorrect!' })
    // }
    const userInfo = {
      _id: resLogin._id,
      username: resLogin.username,
      role: resLogin.role
    }
    const accessToken = await JWTProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5 // 5s
      '1h'
    )
    const refreshToken = await JWTProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      // 15
      '14 days'
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    return res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json({ message: 'Logout success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies?.refreshToken
    // console.log('🚀 ~ refreshToken ~ req.cookies?:', req.cookies)
    // console.log('🚀 ~ refreshToken ~ refreshTokenFromCookie:', refreshTokenFromCookie)

    const refreshTokenDecoded = await JWTProvider.verifyToken(
      refreshTokenFromCookie,
      env.REFRESH_TOKEN_SECRET_SIGNATURE
    )

    const userInfo = {
      _id: refreshTokenDecoded._id,
      username: refreshTokenDecoded.username
    }

    const accessToken = await JWTProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5 // 5s
      '1h'
    )
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    })

    res.status(StatusCodes.OK).json({ accessToken })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Refresh token failed')
  }
}

const access = async (req, res) => {
  try {
    const userInfo = {
      _id: req.jwtDecoded._id,
      email: req.jwtDecoded.email
    }
    res.status(StatusCodes.OK).json(userInfo)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

// const findOneById = async (req, res, next) => {
//   try {
//     const userInfo = await usersService.findOneById(req.params._id)
//     if (userInfo?.password) delete userInfo.password
//     res.status(StatusCodes.OK).json(userInfo)
//   } catch (error) {
//     next(error)
//   }
// }

// const findOneByEmail = async (req, res, next) => {
//   try {
//     const userInfo = await usersService.findOneByEmail(req.body)
//     res.status(StatusCodes.OK).json(userInfo)
//   } catch (error) {
//     next(error)
//   }
// }
// const update = async (req, res, next) => {
//   try {
//     if (req.body?.currentPassword && req.body?.newPassword) {
//       const user = await usersModel.findOneById(req.params._id)
//       const resComparePassword = await comparePassword(req.body.currentPassword, user.password)
//       if (!resComparePassword) {
//         res.status(StatusCodes.BAD_REQUEST).json({ message: 'Current password is incorrect!', type: 'error' })
//       }
//     }

//     const updateData = { ...req.body, password: req.body.newPassword }
//     delete updateData.currentPassword
//     delete updateData.newPassword
//     const hashedPassword = await hashPassword(req.body.newPassword)
//     updateData.password = hashedPassword
//     const updatedUser = await usersService.update(req.params._id, updateData)
//     res.status(StatusCodes.OK).json(updatedUser)
//   } catch (error) { next(error) }
// }


export const usersController = {
  login,
  register,
  logout,
  refreshToken,
  access
  // findOneById,
  // findOneByEmail,
  // update
}