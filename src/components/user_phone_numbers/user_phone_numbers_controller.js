import db from '../../db_models'
import { formatFromDb, formatForDb } from './user_phone_numbers_service'
import utils from '../../utils'

const UserPhoneNumbersController = {}
const model = db.UserPhoneNumber

UserPhoneNumbersController.getUserPhoneNumbers = async (req, res) => {
  try {
    const limit = 15 // number of records per page

    const { id, userId } = req.query

    const page = parseInt(req.query.page, 10) || 1 // page 1 default

    const offset = limit * (page - 1) // define offset

    // default db query
    const dbQuery = {
      where: {},
      limit,
      offset,
      order: [['id', 'DESC']],
    }

    // ability to search by id
    if (id !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        id: parseInt(id, 10),
      }
    }

    // ability to search by userId
    if (userId !== undefined) {
      dbQuery.where = {
        ...dbQuery.where,
        user_id: parseInt(userId, 10),
      }
    }

    const data = await model.findAndCountAll(dbQuery)

    const pages = Math.ceil(data.count / limit)
    const formatted = data.rows.map(formatFromDb)
    utils.success(res, { userPhoneNumbers: formatted, count: data.count, pages, page })
  } catch (err) {
    utils.success(res, err)
  }
}

UserPhoneNumbersController.addUserPhoneNumber = async (req, res) => {
  const formatted = formatForDb(req.body)

  try {
    const userPhoneNumber = await model.create(formatted)
    utils.success(res, { userPhoneNumber: formatFromDb(userPhoneNumber) })
  } catch (err) {
    utils.fail(res, err)
  }
}

UserPhoneNumbersController.updateUserPhoneNumber = async (req, res) => {
  const userPhoneNumber = req.body

  try {
    await model.update(formatForDb(userPhoneNumber), {
      where: {
        id: userPhoneNumber.id,
      },
    })
    const _userPhoneNumber = await model.findOne({
      where: {
        id: req.body.id,
      },
    })
    utils.success(res, { userPhoneNumber: formatFromDb(_userPhoneNumber) })
  } catch (err) {
    utils.fail(res, { message: 'Unable to update phone number.' })
  }
}

UserPhoneNumbersController.deleteUserPhoneNumber = async (req, res) => {
  try {
    const result = await model.destroy({
      where: {
        id: req.body.id,
      },
    })
    if (result === 1) {
      utils.success(res, {
        message: 'Successfully deleted phone number.',
      })
    } else {
      utils.fail(res, { message: 'Unable to delete phone number.' })
    }
  } catch (err) {
    utils.fail(res, err)
  }
}

export default UserPhoneNumbersController