// The bakery and the pizzeria are two SEPARATE shops now (each its own hub build,
// scene, and independent economy) — no longer two wings of one confusing room. A
// shop owns a recipe kind, a disjoint ingredient set, its own starting stock, the
// resident who runs it, and the storefront visuals. Everything shop-specific lives
// here so the engine/scene/controller can stay shop-agnostic and just read SHOPS[id].
export const SHOP_IDS = ['bakery', 'pizzeria'];

export const CUSTOMER_IDS = ['turtle', 'bunny', 'duckling', 'owl'];

export const BUSINESS_CUSTOMERS = {
  turtle: {
    id: 'turtle',
    petId: 'turtle',
    nameKey: 'helper.turtle',
    face: 'turtle',
    patience: 'steady',
  },
  bunny: {
    id: 'bunny',
    petId: 'bunny',
    nameKey: 'helper.bunny',
    face: 'bunny',
    patience: 'bouncy',
  },
  duckling: {
    id: 'duckling',
    petId: 'duckling',
    nameKey: 'helper.duckling',
    face: 'duckling',
    patience: 'sunny',
  },
  owl: {
    id: 'owl',
    petId: 'owl',
    nameKey: 'helper.owl',
    face: 'owl',
    patience: 'thoughtful',
  },
};

export const INGREDIENTS = {
  dough: { id: 'dough', titleKey: 'business.ingredient.dough', unitCostCents: 70 },
  sauce: { id: 'sauce', titleKey: 'business.ingredient.sauce', unitCostCents: 25 },
  cheese: { id: 'cheese', titleKey: 'business.ingredient.cheese', unitCostCents: 45 },
  tomato: { id: 'tomato', titleKey: 'business.ingredient.tomato', unitCostCents: 35 },
  flour: { id: 'flour', titleKey: 'business.ingredient.flour', unitCostCents: 30 },
  berries: { id: 'berries', titleKey: 'business.ingredient.berries', unitCostCents: 40 },
  milk: { id: 'milk', titleKey: 'business.ingredient.milk', unitCostCents: 35 },
};

export const RECIPES = {
  margherita: {
    id: 'margherita',
    kind: 'pizza',
    titleKey: 'business.recipe.margherita',
    basePriceCents: 450,
    ingredients: { dough: 1, sauce: 1, cheese: 1 },
    stages: ['grade_4', 'grade_5', 'grade_6', 'grade_7', 'grade_8'],
  },
  tomato_pizza: {
    id: 'tomato_pizza',
    kind: 'pizza',
    titleKey: 'business.recipe.tomato_pizza',
    basePriceCents: 525,
    ingredients: { dough: 1, sauce: 1, cheese: 1, tomato: 1 },
    stages: ['grade_5', 'grade_6', 'grade_7', 'grade_8'],
  },
  flatbread: {
    id: 'flatbread',
    kind: 'bakery',
    titleKey: 'business.recipe.flatbread',
    basePriceCents: 375,
    ingredients: { flour: 2, milk: 1 },
    stages: ['grade_3', 'grade_4', 'grade_5', 'grade_6'],
  },
  berry_tart: {
    id: 'berry_tart',
    kind: 'bakery',
    titleKey: 'business.recipe.berry_tart',
    basePriceCents: 600,
    ingredients: { flour: 1, berries: 2, milk: 1 },
    stages: ['grade_5', 'grade_6', 'grade_7', 'grade_8'],
  },
};

export const BUSINESS_MODES = {
  money_make_amounts: {
    id: 'money_make_amounts',
    kind: 'payment',
    objectiveId: 'nl_po.grade4.money_to_100',
    minStage: 'grade_4',
  },
  decimal_money_change: {
    id: 'decimal_money_change',
    kind: 'payment',
    objectiveId: 'nl_po.grade5.decimal_money_context',
    minStage: 'grade_5',
  },
  portion_halves_quarters: {
    id: 'portion_halves_quarters',
    kind: 'prep',
    objectiveId: 'nl_po.grade4.fair_sharing_intro',
    minStage: 'grade_4',
  },
  repeated_addition_orders: {
    id: 'repeated_addition_orders',
    kind: 'prep',
    objectiveId: 'nl_po.grade4.tables_2_5_10',
    minStage: 'grade_4',
  },
  recipe_measure_whole: {
    id: 'recipe_measure_whole',
    kind: 'prep',
    objectiveId: 'nl_po.grade5.measurement_units_intro',
    minStage: 'grade_5',
  },
  fraction_of_quantity_recipe: {
    id: 'fraction_of_quantity_recipe',
    kind: 'prep',
    objectiveId: 'nl_po.grade6.fraction_of_quantity',
    minStage: 'grade_6',
  },
  unit_conversion_stock: {
    id: 'unit_conversion_stock',
    kind: 'stock',
    objectiveId: 'nl_po.grade6.unit_conversion_context',
    minStage: 'grade_6',
  },
  price_compare: {
    id: 'price_compare',
    kind: 'upgrade',
    objectiveId: 'nl_po.grade6.price_comparison',
    minStage: 'grade_6',
  },
  percentage_discount: {
    id: 'percentage_discount',
    kind: 'payment',
    objectiveId: 'nl_po.grade7.percentages_intro',
    minStage: 'grade_7',
  },
  profit_margin: {
    id: 'profit_margin',
    kind: 'summary',
    objectiveId: 'nl_po.grade7.profit_margin_intro',
    minStage: 'grade_7',
  },
  scale_recipe: {
    id: 'scale_recipe',
    kind: 'prep',
    objectiveId: 'nl_po.grade7.scale_recipe',
    minStage: 'grade_7',
  },
  demand_chart: {
    id: 'demand_chart',
    kind: 'summary',
    objectiveId: 'nl_po.grade8.advanced_data_reasoning',
    minStage: 'grade_8',
  },
};

export const UPGRADES = {
  extra_oven: {
    id: 'extra_oven',
    titleKey: 'business.upgrade.extra_oven',
    priceCents: 650,
    effect: { ovenSlots: 1 },
    objectiveId: 'nl_po.grade6.price_comparison',
  },
  bigger_pantry: {
    id: 'bigger_pantry',
    titleKey: 'business.upgrade.bigger_pantry',
    priceCents: 900,
    effect: { stockLimit: 6 },
    objectiveId: 'nl_po.grade6.unit_conversion_context',
  },
  bright_sign: {
    id: 'bright_sign',
    titleKey: 'business.upgrade.bright_sign',
    priceCents: 1200,
    effect: { demandBonus: 1 },
    objectiveId: 'nl_po.grade8.advanced_data_reasoning',
  },
};

// The two shops. Ingredient sets are deliberately disjoint so each shop is a real,
// self-contained economy (its own stock, coins, and upgrades). recipeKind matches
// RECIPES[*].kind. resident is the friend who moves in with the build (island.js);
// their `pet` id reuses an existing creature mesh. Storefront props/queue live on
// the scene ZONES, keyed by the same id.
export const SHOPS = {
  bakery: {
    id: 'bakery',
    recipeKind: 'bakery',
    titleKey: 'business.zone.bakery',
    ingredientIds: ['flour', 'berries', 'milk'],
    startingStock: { flour: 6, berries: 4, milk: 4 },
    resident: { pet: 'piglet', face: '🐷', nameKey: 'npc.bakery' },
  },
  pizzeria: {
    id: 'pizzeria',
    recipeKind: 'pizza',
    titleKey: 'business.zone.pizzeria',
    ingredientIds: ['dough', 'sauce', 'cheese', 'tomato'],
    startingStock: { dough: 6, sauce: 6, cheese: 6, tomato: 4 },
    resident: { pet: 'owl', face: '🦉', nameKey: 'npc.pizzeria' },
  },
};

export const shopById = (id) => SHOPS[id] || SHOPS.bakery;

// Which shop a recipe belongs to (bakery bakes 'bakery' kind, pizzeria bakes 'pizza').
export const shopForRecipe = (recipeId) => (RECIPES[recipeId]?.kind === 'pizza' ? 'pizzeria' : 'bakery');

// Recipes a given shop sells, in declaration order.
export const recipesForShop = (shopId) =>
  Object.values(RECIPES).filter((recipe) => recipe.kind === shopById(shopId).recipeKind);
