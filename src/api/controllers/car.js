const celebrate = require("celebrate").celebrate;
const { CONTROLLER, VALIDATOR } = require("../../utils/constants");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const httpStatus = require("http-status");
const Car = require("../../../models/car");
const Make = require("../../../models/make");
const Variant = require("../../../models/variant");
const CarModel = require("../../../models/model");

const addCar = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                make: Joi.string().required(),
                model: Joi.string().required(),
                variant: Joi.string().required(),
                reg_number: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { make, model, variant, reg_number } = req.body;
            const carGot = await Car.findOne({ reg_number });
            const makeGot = await Make.findOne({
                make: new RegExp(`^${make}$`, "i"),
            });
            const modelGot = await CarModel.findOne({
                car_model: new RegExp(`^${model}$`, "i"),
            });
            const variantGot = await Variant.findOne({
                variant: new RegExp(`^${variant}$`, "i"),
            });
            if (carGot)
                return res.status(httpStatus.OK).json({
                    message: "Same car already exist",
                    success: false,
                    data: {},
                });

            const car = new Car({ reg_number });
            if (makeGot) car.make = makeGot._id;
            else {
                const newMake = new Make({ make });
                const makeSaved = await newMake.save();
                car.make = makeSaved._id;
            }
            if (modelGot) car.carModel = modelGot._id;
            else {
                const newModel = new CarModel({ car_model: model });
                const modelSaved = await newModel.save();
                car.carModel = modelSaved._id;
            }
            if (variantGot) car.variant = variantGot._id;
            else {
                const newVariant = new Variant({ variant });
                const variantSaved = await newVariant.save();
                car.variant = variantSaved._id;
            }
            const carSaved = await car.save();
            return res.status(httpStatus.OK).json({
                message: "Car Added successfully",
                success: true,
                data: { carSaved },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING Car : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const addCarMake = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                make: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { make } = req.body;
            const makeGot = await Make.findOne({ make });
            if (makeGot)
                return res.status(httpStatus.OK).json({
                    message: "Same car make already exist",
                    success: false,
                    data: {},
                });
            const makeModel = new Make({ make });
            await makeModel.save();
            return res.status(httpStatus.OK).json({
                message: "Car make Added successfully",
                success: true,
                data: { make },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING Car make : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const addCarVariant = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                variant: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { variant } = req.body;
            const variantGot = await Variant.findOne({ variant });
            if (variantGot)
                return res.status(httpStatus.OK).json({
                    message: "Same car variant already exist",
                    success: false,
                    data: {},
                });
            const variantModel = new Variant({ variant });
            await variantModel.save();
            return res.status(httpStatus.OK).json({
                message: "Car variant Added successfully",
                success: true,
                data: { variant },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING Car variant : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const addCarModel = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                car_model: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { car_model } = req.body;
            const carModelGot = await CarModel.findOne({ car_model });
            if (carModelGot)
                return res.status(httpStatus.OK).json({
                    message: "Same car model already exist",
                    success: false,
                    data: {},
                });
            const carModel = new CarModel({ car_model });
            await carModel.save();
            return res.status(httpStatus.OK).json({
                message: "Car model Added successfully",
                success: true,
                data: { car_model },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING Car model : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getMakeDropdown = {
    [CONTROLLER]: async (req, res) => {
        try {
            const makeGot = await Make.find();
            return res.status(httpStatus.OK).json({
                message: "Car make got successfully",
                success: true,
                data: makeGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Car make : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getVariantDropdown = {
    [CONTROLLER]: async (req, res) => {
        try {
            const variantGot = await Variant.find();
            return res.status(httpStatus.OK).json({
                message: "Car variant got successfully",
                success: true,
                data: variantGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Car variant : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getModelDropdown = {
    [CONTROLLER]: async (req, res) => {
        try {
            const carModelGot = await CarModel.find();
            return res.status(httpStatus.OK).json({
                message: "Car model got successfully",
                success: true,
                data: carModelGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Car model : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getCarDropdown = {
    [CONTROLLER]: async (req, res) => {
        try {
            const carGot = await Car.find();
            return res.status(httpStatus.OK).json({
                message: "Car got successfully",
                success: true,
                data: carGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Cars : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getRegDropdown = {
    [CONTROLLER]: async (req, res) => {
        try {
            const carGot = await Car.find().select({ reg_number: 1, _id: 0 });
            return res.status(httpStatus.OK).json({
                message: "Reg Nu got successfully",
                success: true,
                data: carGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting Reg Nu : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const removeCarModel = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                id: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { id } = req.body;
            const modelDeleted = await CarModel.findByIdAndDelete({ _id: id });
            if (!modelDeleted)
                return res.status(httpStatus.OK).json({
                    message: "Car model not found",
                    success: false,
                    data: modelDeleted,
                });
            return res.status(httpStatus.OK).json({
                message: "Car model removed successfully",
                success: true,
                data: modelDeleted,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE deleting Car model : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

module.exports = {
    addCar,
    addCarMake,
    addCarVariant,
    addCarModel,
    getMakeDropdown,
    getVariantDropdown,
    getModelDropdown,
    getCarDropdown,
    getCarDropdown,
    getRegDropdown,
    removeCarModel,
};
