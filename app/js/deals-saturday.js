// Saturday 28 November 2026: 143 more deals, read between 06:45 and 06:52 UTC on dated roundups (updated 27-28 Nov)
// and store pages. Rows are compact: [product, brand, category, store, store link ('' when the source gave only its
// own or a shortened link, so the card links to the source), sale price, usual price, source key, time read (UTC),
// what the source said about the price's history, condition]. Where the usual price is the store's own comparison
// value (Dell's "Estimated Value", Best Buy's "comparable value") the evidence says so, and the verdict marks it.

const SOURCES = {
  dell: ['https://www.dell.com/en-us/shop/deals', 'Dell deals page'],
  dellLaptops: ['https://www.dell.com/en-us/shop/deals/laptop-deals', 'Dell laptop deals page'],
  dellMonitors: ['https://www.dell.com/en-us/shop/deals/monitor-deals', 'Dell monitor deals page'],
  bh: ['https://www.imaging-resource.com/deals/black-friday/bh-photo/', 'Imaging Resource'],
  gearPatrol: ['https://www.gearpatrol.com/deals/best-black-friday-cyber-monday-weekend-sales-2026/', 'Gear Patrol'],
  slickTv: ['https://daily.slickdeals.net/black-friday/the-best-black-friday-tv-deals-weve-spotted-so-far/', 'Slickdeals'],
  toysYoga: ['https://9to5toys.com/2026/11/27/one-of-the-best-snapdragon-x2-plus-copilot-pc-black-friday-deals-at-700-off/', '9to5Toys'],
  toysBestBuy: ['https://9to5toys.com/2026/11/27/best-buy-main-event-black-friday-sale-now-live/', '9to5Toys'],
  toysWatch: ['https://9to5toys.com/2026/11/27/official-black-friday-apple-watch-deals/', '9to5Toys'],
  pcGuide: ['https://www.pcguide.com/news/black-friday-deals-live-2026/', 'PC Guide'],
  nbcVacuum: ['https://www.nbcnews.com/select/shopping/black-friday-vacuum-deals-2026-rcna610994', 'NBC Select'],
  foodNetwork: ['https://www.foodnetwork.com/how-to/packages/shopping/sales-and-deals/best-black-friday-deals', 'Food Network'],
  yahooHome: ['https://shopping.yahoo.com/deals/breaking-news/article/black-friday-home-deals-up-to-80-off-dyson-shark-ninja-ugg-and-more-123227868.html', 'Yahoo Shopping'],
  popsciTools: ['https://www.popsci.com/gear/best-black-friday-power-tool-deals/', 'Popular Science'],
  bbq: ['https://www.smokedbbqsource.com/black-friday-bbq-grill-deals/', 'Smoked BBQ Source'],
  stonewars: ['https://stonewars.com/deals/lego-black-friday-2026/', 'Stonewars'],
  nbcMain: ['https://www.nbcnews.com/select/shopping/best-black-friday-deals-11-27-2026-rcna611358', 'NBC Select'],
  nbcUnder50: ['https://www.nbcnews.com/select/shopping/black-friday-2026-deals-under-50-rcna611475', 'NBC Select'],
  toysGames: ['https://9to5toys.com/2026/11/27/ps5-switch-2-black-friday-game-deals-live/', '9to5Toys'],
  nbcLuggage: ['https://www.nbcnews.com/select/shopping/black-friday-luggage-deals-2026-rcna610974', 'NBC Select'],
};

const DELL_EV = "Dell calls it the lowest price of the year, but the usual price is Dell's own comparison value";
const DELL_CV = "usual price is Dell's own comparison value";
const BBY_CV = "usual price is Best Buy's comparison value";

const ROWS = [
  // ---------------------------------------------------------------- laptops, monitors, phones, tablets
  ['Dell 14S Laptop (Core 5 320, 8GB, 512GB SSD, 14" FHD+)', 'Dell', 'Laptops', 'Dell', 'https://www.dell.com/en-us/shop/laptop-computers/spd/dell14sds14270/ds14270_so_14', 499.99, 749.99, 'dell', '06:49', DELL_EV, ''],
  ['Dell XPS 13 Laptop (Core 5 320, 8GB, 256GB SSD, 13.4" QHD+ touch)', 'Dell', 'Laptops', 'Dell', 'https://www.dell.com/en-us/shop/laptop-computers/spd/xps13dx13260/dx13260_so_42', 549.99, 749.99, 'dell', '06:49', DELL_EV, ''],
  ['Dell 16 Plus Laptop (Core Ultra 7 258V, 32GB, 1TB SSD, 16" QHD+)', 'Dell', 'Laptops', 'Dell', 'https://www.dell.com/en-us/shop/laptop-computers/spd/dellplus16laptopdb16250/db16250_fixed_13', 1199.99, 2079.99, 'dellLaptops', '06:50', DELL_EV, ''],
  ['Lenovo Yoga Slim 7x Copilot+ PC (Snapdragon X2 Plus, 16GB, 1TB, 2K touch)', 'Lenovo', 'Laptops', 'Lenovo', '', 799.99, 1500, 'toysYoga', '06:48', 'the lowest price we have tracked for this particular model', ''],
  ['Dell 22 Monitor SE2225HM', 'Dell', 'Monitors', 'Dell', 'https://www.dell.com/en-us/shop/monitors/apd/dell-22-monitor-se2225hm/se2225hm/-', 49.99, 89.99, 'dellMonitors', '06:49', DELL_CV, ''],
  ['Dell 24 240Hz Monitor SE2426HGS', 'Dell', 'Monitors', 'Dell', 'https://www.dell.com/en-us/shop/monitors/apd/dell-24-240hz-adjustable-stand-monitor-se2426hgs/se2426hgs/-', 99.99, 139.99, 'dellMonitors', '06:49', DELL_CV, 'Half off this monitor with any PC purchase'],
  ['Alienware 32 4K OLED Gaming Monitor AW3226Q', 'Alienware', 'Monitors', 'Dell', 'https://www.dell.com/en-us/shop/monitors/apd/alienware-32-4k-oled-gaming-monitor-aw3226q/aw3226q_monitor/-', 549.99, 699.99, 'dellMonitors', '06:49', DELL_CV, ''],
  ['Alienware 39 5K OLED Gaming Monitor AW3926QW', 'Alienware', 'Monitors', 'Dell', 'https://www.dell.com/en-us/shop/monitors/apd/alienware-39-5k-oled-gaming-monitor-aw3926qw/aw3926qw/-', 999.99, 1099.99, 'dellMonitors', '06:49', DELL_CV, ''],
  ['Apple iPhone Air 256GB', 'Apple', 'Phones', 'Best Buy', '', 800, 1099, 'toysBestBuy', '06:48', '', ''],
  ['Apple Watch Series 12 42mm GPS', 'Apple', 'Wearables', 'Amazon', '', 299, 399, 'toysWatch', '06:52', 'All-time low', ''],
  ['Nintendo Switch 2 + Mario Kart World bundle', 'Nintendo', 'Gaming', 'Amazon', 'https://www.amazon.com/dp/B0HGHB3V16', 499, 549.99, 'pcGuide', '06:45', '', ''],
  ['Google Home Speaker (2026)', 'Google', 'Smart Home', 'Best Buy', '', 80, 100, 'toysBestBuy', '06:48', 'All-time low', ''],

  // ---------------------------------------------------------------- TVs
  ['Hisense 100" QD7 Hi-QLED 4K TV', 'Hisense', 'TVs', 'Costco', 'https://slickdeals.net/f/20194830', 999.99, 1699.99, 'slickTv', '06:51', '', 'Costco membership; through 30 Nov'],
  ['Samsung 70" U8000H 4K TV', 'Samsung', 'TVs', "Sam's Club", 'https://slickdeals.net/f/20223603', 367.99, 397.99, 'slickTv', '06:51', '', "Sam's Club member price"],
  ['Hisense 65" UR8 RGB Mini-LED TV', 'Hisense', 'TVs', 'Best Buy', 'https://slickdeals.net/f/20317722', 899.99, 1999.99, 'slickTv', '06:51', BBY_CV, ''],
  ['LG 77" B6E OLED TV', 'LG', 'TVs', 'Best Buy', 'https://slickdeals.net/f/20276079', 1499.99, 2699.99, 'slickTv', '06:51', BBY_CV, ''],

  // ---------------------------------------------------------------- cameras at B&H
  ['Nikon Z5 Mirrorless Camera, Basic Bundle', 'Nikon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1735896-REG/nikon_z5_mirrorless_camera_with.html', 796.95, 1450.95, 'bh', '06:50', '', ''],
  ['Canon EOS RP Mirrorless Camera', 'Canon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1459282-REG/canon_eos_rp_mirrorless_digital.html', 699, 1149, 'bh', '06:50', '', ''],
  ['Nikon D7500 DSLR with 18-140mm Lens', 'Nikon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1333200-REG/nikon_d7500_dslr_camera_with.html', 996.95, 1496.95, 'bh', '06:50', '', ''],
  ['Panasonic LUMIX GH5 II Mirrorless Camera', 'Panasonic', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1639337-REG/panasonic_dc_gh5m2body_lumix_gh5_ii_mirrorless.html', 997.99, 1497.99, 'bh', '06:50', '', ''],
  ['Sony a7 III Mirrorless Camera', 'Sony', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1394217-REG/sony_ilce_7m3_alpha_a7_iii_mirrorless.html', 1398, 1998, 'bh', '06:50', '', ''],
  ['Canon EOS R5 Mirrorless Camera', 'Canon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1547009-REG/canon_4147c002_eos_r5_mirrorless_camera.html', 2399, 3299, 'bh', '06:50', '', ''],
  ['Nikon Z8 Mirrorless Camera', 'Nikon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1765622-REG/nikon_z8_mirrorless_camera.html', 3196.95, 4296.95, 'bh', '06:50', '', 'Ends Sun 29 Nov, 11:59pm ET'],
  ['Nikon Z6 III Mirrorless Camera', 'Nikon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1834803-REG/nikon_z6_iii_mirrorless_camera.html', 1996.95, 2696.95, 'bh', '06:50', '', ''],
  ['Panasonic LUMIX G9 II Mirrorless Camera', 'Panasonic', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1945155-REG/panasonic_dc_g9m2body9_lumix_g9_ii_mirrorless.html', 1397.99, 1897.99, 'bh', '06:50', '', ''],
  ['Panasonic LUMIX S9 with 18-40mm Lens', 'Panasonic', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1944584-REG/panasonic_dc_s9nsb9_lumix_s9_mirrorless_camera.html', 1347.99, 1797.99, 'bh', '06:50', '', 'Black/Silver'],
  ['Panasonic LUMIX G97 with 12-60mm Lens', 'Panasonic', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1936326-REG/panasonic_dc_g97mk9_panasonic_lumix_g97_mirrorless.html', 547.99, 847.99, 'bh', '06:50', '', ''],
  ['Nikon NIKKOR Z 28-400mm f/4-8 VR Lens', 'Nikon', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1818948-REG/nikon_nikkor_z_28_400mm_f_4_8.html', 996.95, 1446.95, 'bh', '06:50', '', ''],
  ['SanDisk 128GB Extreme PRO UHS-II SDXC Card', 'SanDisk', 'Cameras', 'B&H Photo', 'https://www.bhphotovideo.com/c/product/1965475-REG/sandisk_sdsdxde_128g_gn4in_128gb_extreme_pro_uhs_ii.html', 229.99, 418.99, 'bh', '06:50', '', ''],

  // ---------------------------------------------------------------- audio at the makers' own stores
  ['Sonos Play portable speaker', 'Sonos', 'Audio', 'Sonos', 'https://www.sonos.com/en-us/shop/sonos-play', 239, 299, 'gearPatrol', '06:47', '', ''],
  ['Sonos Five', 'Sonos', 'Audio', 'Sonos', 'https://www.sonos.com/en-us/shop/five.html', 439, 599, 'gearPatrol', '06:47', '', ''],
  ['Sonos Arc Ultra soundbar', 'Sonos', 'Audio', 'Sonos', 'https://www.sonos.com/en-us/shop/arc-ultra', 849, 1099, 'gearPatrol', '06:47', '', ''],
  ['Sonos Era 300', 'Sonos', 'Audio', 'Sonos', 'https://www.sonos.com/en-us/shop/era-300', 399, 449, 'gearPatrol', '06:47', '', ''],
  ['Audioengine A2+ Gen 3 wireless speakers', 'Audioengine', 'Audio', 'Audioengine', 'https://audioengine.com/shop/wirelessspeakers/a2-wireless-computer-speakers/', 233, 299, 'gearPatrol', '06:47', '', ''],
  ['Bose Lifestyle Ultra Speaker', 'Bose', 'Audio', 'Bose', 'https://www.bose.com/p/speakers/bose-lifestyle-ultra-speaker/LSULT-SPEAKERWIRELESS.html', 299, 349, 'gearPatrol', '06:47', '', ''],
  ['KEF LS50 Wireless II', 'KEF', 'Audio', 'KEF', 'https://us.kef.com/products/ls50-wireless-2', 2199, 2999, 'gearPatrol', '06:47', '', ''],
  ['KEF Q1 Meta bookshelf speakers', 'KEF', 'Audio', 'KEF', 'https://us.kef.com/products/q1-meta', 400, 700, 'gearPatrol', '06:47', '', ''],
  ['Klipsch The Fives II powered speakers', 'Klipsch', 'Audio', 'Klipsch', 'https://www.klipsch.com/products/the-fives-ii-powered-speakers', 900, 1400, 'gearPatrol', '06:47', '', ''],
  ['Klipsch The Nines II powered speakers', 'Klipsch', 'Audio', 'Klipsch', 'https://www.klipsch.com/products/the-nines-ii-powered-speakers', 1550, 2400, 'gearPatrol', '06:47', '', ''],
  ['JBL Flip 7 Bluetooth speaker', 'JBL', 'Audio', 'JBL', 'https://www.jbl.com/bluetooth-speakers/FLIP-7.html', 100, 150, 'gearPatrol', '06:47', '', ''],
  ['Marshall Stanmore III Bluetooth Home Speaker', 'Marshall', 'Audio', 'Best Buy', '', 250, 400, 'toysBestBuy', '06:48', '', ''],

  // ---------------------------------------------------------------- vacuums
  ['Shark Pet Cordless Stick Vacuum IX141', 'Shark', 'Vacuums', 'Home Depot', 'https://www.homedepot.com/p/Shark-Pet-Bagless-Cordless-Washable-Filter-Stick-Vacuum-XL-Dust-Cup-LED-Lights-Removable-Handheld-40min-Runtime-in-Gray-IX141/313118436', 169, 299, 'nbcVacuum', '06:45', '', ''],
  ['Dyson V15 Detect Cordless Pet Stick Vacuum', 'Dyson', 'Vacuums', "Lowe's", 'https://www.lowes.com/pd/Dyson-V15-Cordless-Pet-Stick-Vacuum-Convertible-To-Handheld/5014724771', 599.99, 849.99, 'nbcVacuum', '06:45', '', ''],
  ['Roborock Q7 M5+ Robot Vacuum and Mop', 'Roborock', 'Vacuums', 'Roborock', 'https://us.roborock.com/products/roborock-q7-m5-plus', 199.99, 429.99, 'nbcVacuum', '06:45', 'lowest price ever', ''],
  ['Levoit LVAC-200 Cordless Vacuum', 'Levoit', 'Vacuums', 'Levoit', 'https://levoit.com/collections/vacuums/products/lvac-200-cordless-vacuum', 139.99, 199.99, 'nbcVacuum', '06:45', '', ''],
  ['Tineco Floor One S7 Stretch Ultra Wet/Dry Vacuum', 'Tineco', 'Vacuums', 'Tineco', 'https://store.tineco.com/products/tineco-floor-one-s7-stretch-ultra-cordless-wet-dry-vacuum-cleaner?variant=42055975305300', 299, 599, 'nbcVacuum', '06:45', '', ''],
  ['Bissell PowerClean FurGuard Pet Cordless Stick Vacuum', 'Bissell', 'Vacuums', 'Bissell', 'https://www.bissell.com/en-us/product/powerclean-furguard-cordless-stick-vacuum-4039.html', 189.99, 299.99, 'nbcVacuum', '06:45', '', ''],
  ['Shark Rocket Ultra-Light Corded Stick Vacuum HV301', 'Shark', 'Vacuums', 'Chewy', 'https://www.chewy.com/shark-hv301-rocket-ultra-light-weight/dp/1351038', 99.99, 199.99, 'nbcVacuum', '06:45', '', ''],
  ['Shark Vertex Pro Cordless Vacuum', 'Shark', 'Vacuums', 'Amazon', 'https://www.amazon.com/dp/B098RH3LTB', 249.99, 379.99, 'nbcVacuum', '06:45', '', ''],

  // ---------------------------------------------------------------- kitchen
  ['Vitamix Explorian 2.0 Blender with accessories', 'Vitamix', 'Kitchen', 'QVC', 'https://www.qvc.com/vitamix-explorian-20-variable-speed-blender-w-accessories.product.K92777.html', 279.98, 379, 'foodNetwork', '06:47', '', ''],
  ['Made In 3-Piece Olive Wood Knife Set', 'Made In', 'Kitchen', 'Made In', 'https://madeincookware.com/products/the-knife-set/olive-wood', 329.99, 477, 'foodNetwork', '06:47', '', ''],
  ['Caraway Ceramic Cookware Set', 'Caraway', 'Kitchen', 'Caraway', 'https://www.carawayhome.com/products/cookware-sets/?color=cream', 356, 675, 'foodNetwork', '06:47', '', 'Cream'],
  ['Le Creuset Heritage 4-Qt Round Oven', 'Le Creuset', 'Kitchen', 'QVC', 'https://www.qvc.com/le-creuset-heritage-4-qt-enameled-cast-iron-round-oven-w-lid.product.K314055.html', 169.98, 302, 'foodNetwork', '06:47', '', ''],
  ['Le Creuset Signature Sauteuse, 3.5 qt', 'Le Creuset', 'Kitchen', 'Le Creuset', 'https://www.lecreuset.com/signature-sauteuse-3-1-2-qt/21198US.html', 250, 375, 'yahooHome', '06:47', '', ''],
  ['GreenPan Valencia Pro 3-Frypan Set (8/9.5/11")', 'GreenPan', 'Kitchen', 'GreenPan', 'https://www.greenpan.us/collections/valencia/products/valencia-pro-ceramic-nonstick-8-9-5-and-11-frypan-set-gray-1', 99.99, 259.99, 'foodNetwork', '06:47', '', ''],
  ['Rachael Ray Cucina 10-Piece Bakeware Set', 'Rachael Ray', 'Kitchen', 'Wayfair', 'https://www.wayfair.com/kitchen-tabletop/pdp/rachael-ray-cucina-nonstick-bakeware-baking-pans-set-10-piece-latte-brown-and-cranberry-red-rry3568.html', 134.99, 220, 'foodNetwork', '06:47', '', ''],
  ['Staub Sesame 3-Piece Baking Dish Set', 'Staub', 'Kitchen', 'Crate & Barrel', 'https://www.crateandbarrel.com/staub-sesame-3-piece-rectangular-baking-dish-set/s524503', 99, 190, 'foodNetwork', '06:47', '', ''],
  ['KitchenAid Artisan Stand Mixer', 'KitchenAid', 'Kitchen', 'Williams Sonoma', 'https://www.williams-sonoma.com/products/kitchenaid-artisan-stand-mixer/', 349.95, 449.95, 'foodNetwork', '06:47', '', ''],
  ['GE Profile Opal 2.0 Ultra Nugget Ice Maker', 'GE Profile', 'Kitchen', 'GE Appliances', 'https://www.geappliances.com/appliance/GE-Profile-Opal-2-0-Ultra-Nugget-Ice-Maker-with-Scale-Inhibiting-Filter-XPIO23SWSS', 349, 449, 'foodNetwork', '06:47', '', ''],
  ['Cuisinart Custom 14-Cup Food Processor', 'Cuisinart', 'Kitchen', 'Crate & Barrel', 'https://www.crateandbarrel.com/cuisinart-custom-14-stainless-steel-14-cup-food-processor/s146663', 199.95, 299.95, 'foodNetwork', '06:47', '', ''],
  ['Zwilling Four Star 7-Piece Knife Block Set', 'Zwilling', 'Kitchen', 'Williams Sonoma', 'https://www.williams-sonoma.com/products/zwilling-four-star-eco-knife-block-natural-birch-set-of-7', 199.95, 399.95, 'foodNetwork', '06:47', '', ''],
  ['Lenox Spice Village 24-Piece Jar Collection', 'Lenox', 'Kitchen', "Macy's", 'https://www.macys.com/shop/product/lenox-spice-village-24-pc.-jar-collection-firstmacys?ID=19236529', 208.99, 299, 'foodNetwork', '06:47', '', ''],

  // ---------------------------------------------------------------- sleep and home
  ['Wayfair Basics 1800 Series Sheet Set, Queen', 'Wayfair Basics', 'Sleep', 'Wayfair', 'https://www.wayfair.com/bed-bath/pdp/wayfair-basics-1800-series-sheet-set-wfbs1741.html', 20, 120, 'yahooHome', '06:47', '', ''],
  ['Cozy Earth Bamboo Sheet Set, Queen', 'Cozy Earth', 'Sleep', 'Cozy Earth', 'https://cozyearth.com/products/bamboo-sheet-set?variant=42387774275764', 194, 324, 'yahooHome', '06:47', '', ''],
  ['Brooklinen All-Season Down Alternative Comforter, Queen', 'Brooklinen', 'Sleep', 'Brooklinen', 'https://www.brooklinen.com/products/down-alternative-comforter?variant=42723524214874', 217, 289, 'yahooHome', '06:47', '', ''],
  ['Nectar Classic Memory Foam Mattress, Queen', 'Nectar', 'Sleep', 'Nectar', 'https://www.nectarsleep.com/mattress', 699, 1567, 'yahooHome', '06:47', '', ''],
  ['Cocoon by Sealy Chill Mattress, Queen', 'Cocoon by Sealy', 'Sleep', 'Cocoon by Sealy', 'https://www.cocoonbysealy.com/mattress/the-chill-mattress/v/126/', 597, 919, 'yahooHome', '06:47', '', 'Code Cocoon35'],
  ['Bear Elite Hybrid Mattress, Queen', 'Bear', 'Sleep', 'Bear', 'https://www.bearmattress.com/products/elite-hybrid-mattress', 1671, 2570, 'yahooHome', '06:47', '', 'Code BF35'],
  ['Lola Blankets Faux Fur Original Blanket (Creamy Cloud)', 'Lola Blankets', 'Home', 'Lola Blankets', 'https://lolablankets.com/products/creamy-cloud?variant=41683293438123', 163, 325, 'yahooHome', '06:47', '', 'Code BF50'],
  ['HaiiMeid Van Gogh Abstract Area Rug, 8 x 10 ft', 'HaiiMeid', 'Home', 'Home Depot', 'https://www.homedepot.com/p/HaiiMeid-Van-Gogh-8-ft-x-10-ft-Beige-Grey-Modern-Abstract-Area-Rug-X24IU0057H-281/333291096', 119, 227, 'yahooHome', '06:47', '', ''],
  ['Teko Hover Scrubber Cordless Mop', 'Teko', 'Home', 'QVC', 'https://www.qvc.com/p/teko-hover-scrubber-electric-indooroutdoor-cordless-mop/V90537', 50, 75, 'yahooHome', '06:47', '', ''],

  // ---------------------------------------------------------------- tools
  ['DeWalt Atomic 20V Max 2-Tool Combo Kit (DCK225D2)', 'DeWalt', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/322138483', 149, 249, 'popsciTools', '06:46', '', ''],
  ['Milwaukee M18 Brushless 1/2" Compact Drill Kit (3601-21P)', 'Milwaukee', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/325479354', 99, 199, 'popsciTools', '06:46', '', ''],
  ['Milwaukee M18 9-Tool Combo Kit (3692-29)', 'Milwaukee', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/343077421', 699, 1389, 'popsciTools', '06:46', '', ''],
  ['Ryobi ONE+ 18V 6-Tool Combo Kit (PCL1600K2)', 'Ryobi', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/317987591', 199, 299, 'popsciTools', '06:46', '', ''],
  ['Husky 310-Piece Mechanics Tool Set (H310MTS)', 'Husky', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/341370940', 99, 199, 'popsciTools', '06:46', '', ''],
  ['Bosch 50-ft Self-Leveling Cross-Line Laser (GLL50-20)', 'Bosch', 'Tools', 'Home Depot', 'https://www.homedepot.com/p/327671498', 49.97, 95, 'popsciTools', '06:46', '', ''],
  ['Kobalt 24V Brushless Drill and Impact Driver Kit', 'Kobalt', 'Tools', "Lowe's", 'https://www.lowes.com/pd/Kobalt-2-Tool-Brushless-Power-Tool-Combo-Kit-1-Batteries-Included-and-Charger-Included/5019790397', 79, 149, 'popsciTools', '06:46', '', ''],
  ['DeWalt 12" Double-Bevel Sliding Miter Saw (DWS780)', 'DeWalt', 'Tools', "Lowe's", 'https://www.lowes.com/pd/DEWALT-12-in-15-Amps-Amp-Dual-Bevel-Sliding-Compound-Corded-Miter-Saw/5013817811', 399, 649, 'popsciTools', '06:46', '', ''],
  ['Craftsman Versastack 242-Piece Mechanics Tool Set', 'Craftsman', 'Tools', "Lowe's", 'https://www.lowes.com/pd/CRAFTSMAN-24Pc-VERSASTACK-Mechanics-Tool-Set/5016365155', 99, 229, 'popsciTools', '06:46', '', ''],
  ['Shop-Vac 16-Gallon 6.5 HP Wet/Dry Vacuum', 'Shop-Vac', 'Tools', "Lowe's", 'https://www.lowes.com/pd/Shop-Vac-16-Gallon-Corded-Portable-Wet-Dry-Shop-Vacuum/5013296515', 69.98, 139, 'popsciTools', '06:46', '', ''],
  ['Kobalt 46" 9-Drawer Rolling Workbench', 'Kobalt', 'Tools', "Lowe's", 'https://www.lowes.com/pd/Kobalt-46-1-in-L-x-37-2-in-H-9-Drawers-Rolling-Black-Wood-Work-Bench/5013467719', 298, 498, 'popsciTools', '06:46', '', ''],
  ['Bosch Profactor 18V 12" Glide Miter Saw (tool only)', 'Bosch', 'Tools', "Lowe's", 'https://www.lowes.com/pd/Bosch-PROFACTOR-18V-Surgeon-12-In-Dual-Bevel-Glide-Miter-Saw-Bare-Tool/5001905741', 479.99, 849, 'popsciTools', '06:46', '', ''],

  // ---------------------------------------------------------------- grills, griddles, pizza ovens, fire pits
  ['Pit Boss 700 DX Pellet Grill', 'Pit Boss', 'Grills', "Lowe's", '', 399, 579, 'bbq', '06:48', '', 'Ends 2 Dec'],
  ['Traeger Woodridge Pro Pellet Grill', 'Traeger', 'Grills', "Lowe's", '', 999, 1149.99, 'bbq', '06:48', '', ''],
  ['Weber Smoque Pellet Grill', 'Weber', 'Grills', "Lowe's", '', 599, 799, 'bbq', '06:48', '', ''],
  ['Weber Genesis E-315 Gas Grill', 'Weber', 'Grills', "Lowe's", '', 799, 899, 'bbq', '06:48', '', 'Ends 2 Dec'],
  ['Blackstone 36" Culinary Omnivore Griddle with Hood', 'Blackstone', 'Grills', "Lowe's", '', 449, 599, 'bbq', '06:48', '', 'Ends 30 Dec'],
  ['Blackstone 36" Griddle Starter Bundle', 'Blackstone', 'Grills', 'Blackstone', 'https://blackstoneproducts.com/products/36-starter-bundle', 549, 688.98, 'foodNetwork', '06:47', '', ''],
  ['recteq Flagship 1600 Pellet Grill', 'recteq', 'Grills', 'recteq', '', 1249.99, 1599.99, 'bbq', '06:48', '', 'Ends 30 Nov'],
  ['Grilla Silverbac 2.0 XL Pellet Grill', 'Grilla', 'Grills', 'Grilla Grills', 'https://www.grillagrills.com/product/4001313', 989.99, 1799.99, 'bbq', '06:48', '', ''],
  ['Traeger Flatrock 3-Burner Griddle', 'Traeger', 'Grills', 'Ace Hardware', '', 799, 999.99, 'bbq', '06:48', '', ''],
  ['Weber Slate 30" Rust-Resistant Griddle', 'Weber', 'Grills', 'BBQGuys', 'https://www.bbqguys.com/i/3193451/weber-grills/slate-30-rust-resistant-griddle', 649, 849, 'bbq', '06:48', '', 'Ends today, 28 Nov'],
  ['Kamado Joe Classic Joe II 18" Ceramic Grill', 'Kamado Joe', 'Grills', 'Amazon', '', 1249, 1499.99, 'bbq', '06:48', 'at a 30-day low on Amazon', ''],
  ['Ooni Karu 12 Multi-Fuel Pizza Oven', 'Ooni', 'Outdoors', 'Ooni', 'https://ooni.com/products/ooni-karu', 249, 349, 'foodNetwork', '06:47', '', ''],
  ['Ooni Koda 12 Propane Pizza Oven', 'Ooni', 'Outdoors', "Lowe's", '', 300.3, 429, 'bbq', '06:48', '', 'Ends 30 Nov'],
  ['Gozney Roccbox Pizza Oven', 'Gozney', 'Outdoors', 'Gozney', 'https://us.gozney.com/products/roccbox', 399.99, 499.99, 'bbq', '06:48', '', ''],
  ['Solo Stove Pi Prime Propane Pizza Oven', 'Solo Stove', 'Outdoors', 'Amazon', '', 299.99, 399.99, 'bbq', '06:48', 'at its lowest price in a year on Amazon', ''],
  ['Solo Stove Bonfire 19.5" Fire Pit with Stand', 'Solo Stove', 'Outdoors', 'Amazon', '', 282.14, 349.99, 'bbq', '06:48', 'at a 90-day low on Amazon', ''],

  // ---------------------------------------------------------------- LEGO and toys
  ['LEGO Star Wars Wicket the Ewok (75430)', 'LEGO', 'Toys', 'LEGO', '', 103.99, 129.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Icons Flower Arrangement (10345)', 'LEGO', 'Toys', 'LEGO', '', 76.99, 109.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Harry Potter Diagon Alley Wizarding Shops (76444)', 'LEGO', 'Toys', 'LEGO', '', 159.99, 199.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Star Wars AT-ST Walker (75417)', 'LEGO', 'Toys', 'LEGO', '', 159.99, 199.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Williams Racing FW14B & Nigel Mansell (10353)', 'LEGO', 'Toys', 'LEGO', '', 47.99, 79.99, 'stonewars', '06:46', '', 'While supplies last'],
  ["LEGO Bluey's Family House with Memory Game (10459)", 'LEGO', 'Toys', 'LEGO', '', 41.99, 69.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Disney Kakamora Barge (43258)', 'LEGO', 'Toys', 'LEGO', '', 59.99, 99.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Technic Volvo L120 Electric Wheel Loader (42209)', 'LEGO', 'Toys', 'LEGO', '', 71.99, 119.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['LEGO Harry Potter Enchanted Flying Ford Anglia (76470)', 'LEGO', 'Toys', 'LEGO', '', 55.99, 79.99, 'stonewars', '06:46', '', 'While supplies last'],
  ['Toniebox 2 Starter Set (Bluey)', 'Tonies', 'Toys', "Macy's", 'https://www.macys.com/shop/product/tonies-bluey-toniebox-2-screen-free-interactive-starter-set-ages-1?ID=27115185', 99.99, 149.99, 'nbcMain', '06:48', '', ''],
  ['PicassoTiles 100-Piece Magnetic Tiles', 'PicassoTiles', 'Toys', 'Amazon', 'https://www.amazon.com/dp/B00AU56C5W', 27.99, 39.99, 'nbcUnder50', '06:48', '', ''],
  ['3Doodler Start+ Essentials 3D Pen Set', '3Doodler', 'Toys', 'Amazon', 'https://www.amazon.com/dp/B086JQQHPK', 39.99, 52.81, 'nbcUnder50', '06:48', '', ''],

  // ---------------------------------------------------------------- video games
  ["Assassin's Creed Black Flag Resynced (PS5)", 'Ubisoft', 'Video Games', 'Amazon', 'https://www.amazon.com/dp/B0GY5YZC4P', 30, 60, 'toysGames', '06:46', 'All-time low', ''],
  ['Donkey Kong Bananza (Switch 2)', 'Nintendo', 'Video Games', 'Amazon', '', 49, 70, 'toysGames', '06:46', '', ''],
  ['Metroid Prime 4: Beyond, Switch 2 Edition', 'Nintendo', 'Video Games', 'Amazon', '', 49, 70, 'toysGames', '06:46', '', ''],
  ['Kirby Air Riders (Switch 2)', 'Nintendo', 'Video Games', 'Amazon', '', 50, 70, 'toysGames', '06:46', '', ''],
  ["Marvel's Spider-Man 2 (PS5)", 'Sony', 'Video Games', 'Amazon', 'https://www.amazon.com/dp/B0C7WQRCPB', 30, 70, 'toysGames', '06:46', '', ''],
  ["Ghost of Tsushima Director's Cut (PS5)", 'Sony', 'Video Games', 'Amazon', 'https://www.amazon.com/dp/B098G34GBT', 30, 70, 'toysGames', '06:46', '', ''],

  // ---------------------------------------------------------------- travel
  ['Away The Carry-On Hardside Spinner', 'Away', 'Travel', 'Away', 'https://www.awaytravel.com/products/carry-on-coast-blue', 206, 275, 'nbcLuggage', '06:47', '', 'Coast Blue'],
  ['Away The Large Checked 29" Spinner', 'Away', 'Travel', 'Away', 'https://www.awaytravel.com/products/large-blush-pink', 281, 375, 'nbcLuggage', '06:47', '', 'Blush Pink'],
  ['Travelpro Maxlite 5 International Carry-On Spinner', 'Travelpro', 'Travel', 'Travelpro', 'https://travelpro.com/products/maxlite%C2%AE-5-international-expandable-carry-on-spinner', 110, 160, 'nbcLuggage', '06:47', '', ''],
  ['SwissGear Sion Reserve Medium Checked Spinner', 'SwissGear', 'Travel', 'SwissGear', 'https://www.swissgear.com/products/sion-reserve-medium-checked-spinner', 82.5, 165, 'nbcLuggage', '06:47', '', ''],
  ['adidas Defender 5 Medium Duffel Bag', 'adidas', 'Travel', 'adidas', 'https://www.adidas.com/us/defender-5-medium-duffel-bag/JJ7406.html', 40, 50, 'nbcLuggage', '06:47', '', ''],
  ['The North Face Recon Laptop Backpack', 'The North Face', 'Travel', 'REI', 'https://www.rei.com/product/236583/the-north-face-recon-pack-mens', 87.49, 125, 'nbcLuggage', '06:47', '', ''],
  ['Samsonite Hardside Carry-On', 'Samsonite', 'Travel', 'Amazon', 'https://www.amazon.com/dp/B0B31NVLGQ', 103, 219.99, 'nbcLuggage', '06:47', '', ''],

  // ---------------------------------------------------------------- fashion and fitness
  ["Ugg Women's Tazz II", 'Ugg', 'Fashion', 'Ugg', 'https://www.ugg.com/women-slippers/tazz-ii/1174471.html', 99.99, 150, 'nbcUnder50', '06:48', '', 'Deal of the Day'],
  ['Ugg Classic Micro', 'Ugg', 'Fashion', 'Ugg', 'https://www.ugg.com/women-boots/classic-micro/1173891.html?dwvar_1173891_color=CHE', 97.99, 140, 'nbcMain', '06:48', '', 'Chestnut'],
  ["Bombas Women's Ankle Socks 4-Pack", 'Bombas', 'Fashion', 'Bombas', 'https://bombas.com/products/women-s-solid-ankle-four-pack?variant=neutrals&size=m', 37.8, 56, 'nbcUnder50', '06:48', '', 'Sitewide sale through 2 Dec'],
  ["Lands' End 5-Pocket Canvas Tote, Medium", "Lands' End", 'Fashion', "Lands' End", 'https://www.landsend.com/products/canvas-pocket-tote/id_299717', 29.56, 39.95, 'nbcUnder50', '06:48', '', 'Code BELIEVE'],
  ['Standard Baggu (Mercado)', 'Baggu', 'Fashion', 'Baggu', 'https://baggu.com/products/standard-baggu-mercado', 12, 16, 'nbcUnder50', '06:48', '', 'Discount applied at checkout'],
  ['Alo Accolade Crew Neck Pullover', 'Alo', 'Fashion', 'Alo', 'https://www.aloyoga.com/products/u3031rg-accolade-crew-neck-pullover-espresso?variant=43766268592308', 96, 138, 'nbcMain', '06:48', '', 'Espresso'],
  ["Hoka Women's Arahi 8 Running Shoes", 'Hoka', 'Fitness', "Dick's Sporting Goods", 'https://www.dickssportinggoods.com/p/hoka-womens-arahi-8-running-shoes-25fhqwrh8whtwhtxxftw/25fhqwrh8whtwhtxxftw?sku=27431390', 119.99, 149.99, 'nbcMain', '06:48', '', ''],
  ['Theragun Mini (3rd Gen)', 'Therabody', 'Fitness', 'Nordstrom', 'https://www.nordstrom.com/s/therabody-theragun-mini-3rd-gen-massage-device/8666580', 154.99, 219.99, 'nbcMain', '06:48', '', ''],
  ['Oura Ring 5 (Silver)', 'Oura', 'Fitness', 'Ulta', 'https://www.ulta.com/p/oura-ring-5-silver-pimprod2063171?sku=2664669', 299, 399, 'nbcMain', '06:48', '', 'Through 30 Nov'],

  // ---------------------------------------------------------------- beauty
  ['Laneige Lip Sleeping Mask', 'Laneige', 'Beauty', 'Sephora', 'https://www.sephora.com/product/lip-sleeping-mask-P420652', 18, 24, 'nbcUnder50', '06:48', '', ''],
  ['Charlotte Tilbury Lip Cheat Liner, Pillow Talk', 'Charlotte Tilbury', 'Beauty', 'Sephora', 'https://www.sephora.com/product/lip-cheat-lip-liner-P433516', 19.6, 28, 'nbcMain', '06:48', '', ''],
  ['Medicube Zero Pore Pad 2.0', 'Medicube', 'Beauty', 'Ulta', 'https://www.ulta.com/p/zero-pore-pad-pimprod2053434?sku=264535', 15.75, 21, 'nbcUnder50', '06:48', '', 'Ulta sale ends today, 28 Nov'],
  ['Olaplex No.7 Bonding Hair Oil', 'Olaplex', 'Beauty', 'Ulta', 'https://www.ulta.com/p/no7-bonding-hair-oil-pimprod2029354?sku=2591018', 22.4, 32, 'nbcMain', '06:48', '', 'Ulta sale ends today, 28 Nov'],
  ['Grace & Stella Under-Eye Masks, 24 pairs (Gold)', 'Grace & Stella', 'Beauty', 'Grace & Stella', 'https://www.graceandstella.com/products/feel-good-under-eye-masks', 18.95, 26, 'nbcUnder50', '06:48', '', ''],
  ['Topicals Faded Under Eye Masks, set of 6', 'Topicals', 'Beauty', 'Topicals', 'https://mytopicals.com/products/faded-under-eye-masks', 17.6, 22, 'nbcUnder50', '06:48', '', ''],
  ['Biodance Bio-Collagen Real Deep Mask', 'Biodance', 'Beauty', "Kohl's", 'https://www.kohls.com/product/prd-7810360/biodance-bio-collagen-real-deep-mask-for-pore-minimizing-firming-care.jsp', 15.2, 19, 'nbcUnder50', '06:48', '', ''],
  ['Salt & Stone Body Wash', 'Salt & Stone', 'Beauty', 'Salt & Stone', 'https://www.saltandstone.com/products/body-wash?variant=44179095093498', 28.8, 36, 'nbcUnder50', '06:48', '', ''],
  ['Jolie Filtered Showerhead', 'Jolie', 'Beauty', 'Jolie', 'https://jolieskinco.com/products/the-jolie-showerhead?variant=41313550893213', 127, 169, 'nbcMain', '06:48', '', ''],
  ['Oral-B iO3 Electric Toothbrush', 'Oral-B', 'Beauty', 'Oral-B', 'https://oralb.com/en-us/products/oral-b-io-series-3-clean-protect-rechargeable-electric-toothbrush-matte-white/', 59.99, 89.99, 'nbcMain', '06:48', '', ''],
];

export const SATURDAY = ROWS.map(([product, brand, category, store, url, price, was, key, time, evidence, condition]) => {
  const [source, sourceName] = SOURCES[key];
  return { product, brand, category, store, url: url || source, price, was, source, sourceName, checkedAt: `2026-11-28T${time}:00Z`, evidence, condition };
});
