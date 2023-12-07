const { addCar, addCarMake, addCarVariant, addCarModel, getMakeDropdown, getVariantDropdown, getModelDropdown, getCarDropdown, removeCarModel } = require("../controllers/car");

const router = require("express").Router();

router.post(
    "/add-car",
    addCar.validator,
    addCar.controller
);
router.post(
    "/add-car-make",
    addCarMake.validator,
    addCarMake.controller
);
router.post(
    "/add-car-variant",
    addCarVariant.validator,
    addCarVariant.controller
);
router.post(
    "/add-car-model",
    addCarModel.validator,
    addCarModel.controller
);

router.get("/get-make-dropdown", getMakeDropdown.controller)
router.get("/get-variant-dropdown", getVariantDropdown.controller)
router.get("/get-model-dropdown", getModelDropdown.controller)
router.get("/get-car-dropdown", getCarDropdown.controller)
router.get("/get-reg-nu-dropdown", getCarDropdown.controller)

router.delete(
    "/remove-car-model",
    removeCarModel.validator,
    removeCarModel.controller
);

module.exports = router;
