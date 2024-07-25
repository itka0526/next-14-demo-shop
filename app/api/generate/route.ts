import prisma from "@/lib/db";
import { Category, Product, SubCategory } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const memo: Record<string, number> = {};
        // Users
        await prisma.user.createMany({
            data: [
                { email: "admin@admin.com", name: "admin", password: "123123", role: "ADMIN" },
                { email: "user@user.com", name: "user", password: "123123", role: "USER" },
            ],
        });
        // Categories
        await prisma.category.createMany({
            data: data.categories,
        });
        // Subcategories
        for (const [categoryName, subCategories] of Object.entries(data.subCategories)) {
            let categoryId;
            if (memo[categoryName]) {
                categoryId = memo[categoryName];
            } else {
                const category = await prisma.category.findUnique({ where: { categoryName }, select: { id: true } });
                if (!category) throw Error("Cannot find category.");
                memo[categoryName] = category.id;
                categoryId = category.id;
            }
            subCategories.forEach((subCategory) => (subCategory.categoryId = categoryId));
            await prisma.subCategory.createMany({ data: subCategories as SubCategory[] });
        }
        // Products
        for (const [subCategoryName, products] of Object.entries(data.products)) {
            let subCategoryId;
            if (memo[subCategoryName]) {
                subCategoryId = memo[subCategoryName];
            } else {
                const subCategory = await prisma.subCategory.findUnique({ where: { subCategoryName }, select: { id: true } });
                if (!subCategory) throw Error("Cannot find subcategory.");
                memo[subCategoryName] = subCategory.id;
                subCategoryId = subCategory.id;
            }
            products.forEach((product) => (product.subCategoryId = subCategoryId));
            await prisma.product.createMany({ data: products as Product[] });
        }
        return NextResponse.json({ message: "Generated demo data." });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to generate demo data." });
    }
}

var data: {
    categories: Partial<Category>[];
    subCategories: { [key: Category["categoryName"]]: Partial<SubCategory>[] };
    products: { [key: SubCategory["subCategoryName"]]: Partial<Product>[] };
} = {
    categories: [
        { categoryDisplayName: "Хувцас", categoryName: "clothes" },
        { categoryDisplayName: "Цахилгаан бараа", categoryName: "electornics" },
        { categoryDisplayName: "Гоо сайхан", categoryName: "beauty" },
        { categoryDisplayName: "Цүнх", categoryName: "bags" },
        { categoryDisplayName: "Эрүүл мэнд", categoryName: "health" },
        { categoryDisplayName: "Тоглоом", categoryName: "games" },
    ],
    subCategories: {
        clothes: [
            { subCategoryDisplayName: "Гутал", subCategoryName: "shoes" },
            { subCategoryDisplayName: "Өмд", subCategoryName: "pants" },
            { subCategoryDisplayName: "Цамц", subCategoryName: "shirts" },
            { subCategoryDisplayName: "Малгай", subCategoryName: "hats" },
        ],
        electornics: [
            { subCategoryDisplayName: "Компьютер", subCategoryName: "computers" },
            { subCategoryDisplayName: "Гар утас", subCategoryName: "phones" },
            { subCategoryDisplayName: "Зурагт", subCategoryName: "tvs" },
            { subCategoryDisplayName: "Ноутбүк", subCategoryName: "laptops" },
        ],
    },
    products: {
        shoes: [
            {
                productDisplayName: "Slippers - Silk",
                productName: "SLPPCB",
                price: 64000,
                featured: true,
                description: "Нямбай дэгжин хийцлэл нь таны хөлийг улам сайхан харагдуулна ",
            },
            {
                productDisplayName: "RBK PREMIER PUMP PARIS TRAINER",
                productName: "RESO4EY2U-E2",
                price: 429000,
                description: "Synthetic & Suede Overlays, Rubber Outsole",
            },
            {
                productDisplayName: "Arko Mingle",
                productName: "4CS900053",
                price: 1400000,
                description: "",
            },
            {
                productDisplayName: "LNCLNPEAK MIDF L WP BLK,FQ",
                productName: "A5PPB-015",
                price: 499000,
                description: "W Footwear Leather Upper Over Ankle Rubber Sole",
            },
            {
                productDisplayName: "Timberland Premium 6 INCH LACE,FQ",
                productName: "10361-713",
                price: 699000,
                description: "Footwear Leather Upper Over Ankle Rubber Sole",
            },
        ],
        pants: [
            {
                productDisplayName: "Сойлттой өмд",
                productName: "2112403_7528",
                price: 82000,
                featured: true,
                description: "Өмдний доороо сойлттой сул загварын өмд.",
            },
            {
                productDisplayName: "Эрэгтэй өргөн өмд",
                productName: "1112307_417",
                price: 82000,
                description: "Өмдний доороо сойлттой сул загварын өмд.",
            },
            {
                productDisplayName: "Өргөн урт брюк өмд",
                productName: "2112305_7488",
                price: 99000,
                description: "Өргөн эмэгтэй брюк өмдСул өмсгөлтэй .S: 45-55кг M: 55-65кг L: 66-75кг тохиромжтой",
            },
            {
                productDisplayName: "Өргөн Нэхмэл Өмд",
                productName: "2138377-9898",
                price: 144990,
                description: "Өргөн Нэхмэл Ноосон Саарал",
            },
        ],
        shirts: [
            {
                productDisplayName: "2 IN 1 SWEATER",
                productName: "8654000624760",
                price: 158800,
                featured: true,
                description:
                    "\nMinimal in design. Straight fitting. A chunky five gauge knit.Warming and cosy, made from 100% traceable superfine wool. A beautiful versatile piece for the coming - easy, flattering, uncluttered.\n\n \n\nЭнгийн хэв маягийг эрхэмлэгчдэд зориулсан Шулуун тохируулгатай. Сүлжмэл цамц нь дулаахан, тухтай мэдрэмжийг өгнө.\n",
            },
            {
                productDisplayName: "Regular fit sweater",
                productName: "1026M103D-100",
                price: 238900,
                description:
                    "DESCRIPTIONSolid colored sweater Crew neck Long sleeves Ribbed knit collar, cuffs and bottom Regular fit Designed in ItalyComposition43% Nylon 38% Acrylic 19% AlpacaMade inSerbiaProduct code1026M103D_100Clothing careHand wash. Maximum temperature 40°C.Do not bleach.Do not tumble dry.Flat dry in shade.Iron at low temperature.Professional dry-cleaning in: perchloroethylene, hydrocarbons.The sweater from the Sisley collection is made of smooth knitwear. Model made of extremely pleasant to the touch material.- Simple style that does not restrict movement.- Classic round neckline.- The model is finished with elastic taped tape.- Thin, elastic knitwear.",
            },
            {
                productDisplayName: "Boxy fit sweater",
                productName: "14ETM1038-100",
                price: 218900,
                description:
                    "DESCRIPTIONCropped sweater Solid colored Crew neck Long raglan sleeves Ribbed edges Boxy fit Designed in ItalyComposition72% Viscose 28% PolyesterMade inChinaProduct code14ETM1038_100Clothing careHand wash. Maximum temperature 40°C.Do not bleach.Do not tumble dry.Flat dry in shade.Iron at low temperature.Do not dry-clean.Sisley women's viscose blend crew neck sweater with long raglan sleeves. Rib knit collar, cuffs and hem.",
            },
            {
                productDisplayName: "Knit turtleneck top",
                productName: "103VM2016-62W",
                price: 198900,
                description:
                    "DESCRIPTIONKnit top 100% lyocell Turtle neck Ribbed edges Regular fit Designed in ItalyComposition100% LyocellMade inCroatiaProduct code103VM2016_62WClothing careMachine washable at a maximum temperature of 30°C. Gentle cycle.Do not bleach.Do not tumble dry.Flat dry in shade.Iron at low temperature.Professional dry-cleaning in: perchloroethylene, hydrocarbons.",
            },
            {
                productDisplayName: "Knit top with lurex",
                productName: "11PUM103E-903",
                price: 202900,
                description:
                    "DESCRIPTIONKnit top Lurex threads Halter neck Ribbed edges Fitted Designed in ItalyComposition38% Viscose 37% Cotton 18% Polyester 7% Metallised FiberMade inChinaProduct code11PUM103E_903Clothing careHand wash. Maximum temperature 40°C.Do not bleach.Do not tumble dry.Flat dry in shade.Iron at low temperature.Do not dry-clean.",
            },
            {
                productDisplayName: "MENS SHIRTS SS,FQ",
                productName: "DK011766-BLK",
                price: 149900,
                description:
                    "MEN WOVEN SHIRTS , 65% Polyester 35% CottonWork shirt short sleeve \"1574\"A short sleeve work shirt that pursues functionality and durability using a 5.25 -mechanical stitch twill material with a firm polyester cotton. The flap pocket on both chests also adds casual accents. It is comfortable and comfortable to wear. You can styling without hesitation with a spacious silhouette. Open the button and use it as a replacement. A design that uses a long -designed square tail designed so that it can be worn on both tacks and no tuck. The specifications that are excellent in moisture absorption and radiating and hard to wrinkle,  Set up with the original 874 work pants . You can also enjoy styling like.  Men's model: H180 B91 W76 H97 Wear size: L  Women's model: H165 B78 W58 H86 Wear size: Sblack",
            },
        ],
        hats: [
            {
                productDisplayName: "uvex rain cap bike lime-white- борооны малгай шар",
                productName: "S4199500500",
                price: 49500,
                featured: true,
                description: "Бороо болон салхины хамгаалалтай хөнгөн, өмсөхөд тухтай дугуй малгай Хэмжээ: S M,",
            },
            {
                productDisplayName: "uvex bike cap all season black - дугуйн малгай хар",
                productName: "S4190070101",
                price: 55000,
                description:
                    "*Каскны дотор өмсөхөд тухтай *Салхи болон цаг агаарын таагүй нөхцөл байдлаас хамгаална * Дөрвөн улирал өмсөх боломжтой *Амьсгалдаг материалтай *Харагдац сайжруулах цацруулагчтай *Угаалгын машинаар угаах боломжтой  *Хурдан хатдаг дугуйн малгай Хэмжээ: S M",
            },
        ],
        computers: [
            {
                productDisplayName:
                    "HP IDS 280 Pro G7 Microtower PC Intel Core i3-10105 3.7Ghz, 4GB DDR4 2666MHz, 256GB M.2 2280 PCIe NVMe SSD, DVDRW, K&M, Win10 home",
                productName: "19148",
                price: 1639900,
                featured: true,
                description:
                    "\nHP IDS 280 Pro G7 Microtower PC\n\n\n\nҮйлдлийн систем\nWindows 10 Home\n\n\nПроцессор\nIntel® Core™ i3-10105 (4 core 8 threads, base frequency 3.70 GHz up to 4.40 GHz)\n\n\nГрафик карт\nIntel® UHD Graphics 630\n\n\nШуурхай санах ой\n4GB DDR4 2666MHz\n\n\nБагтаамж\n256GB M.2 2280 PCIe NVMe SSD\n\n\nI O оролт\n\n1 x HDMI\n1 x line in\n1 x line out\n1 x power connector\n1 x RJ-45\n1 x serial\n1 x VGA\n2 x USB 2.0\n\n\n\nCD DVD уншигч\nТийм\n\n\nАудио\nRealtek ALC3601 code, combo microphone headphone jack\n\n\nИнтернет\n10 100 1000 Gigabit Ethernet LAN\n\n\nХэмжээ\n15.5 x 30.3 x 33.7 cm\n\n\nЖин\n4.7 kg\n\n\nБаталгаа\n12 сар\n\n\n\n",
            },
            {
                productDisplayName:
                    "HP IDS 280 Pro G8 Microtower PC Intel Core i7-11700 2.5Ghz, 8GB DDR4 2933MHz, 512GB M.2 2280 PCIe NVMe SSD, AMD Radeon RX550X 4GB, DVDRW, K&M, Win11 home",
                productName: "19152",
                price: 3499900,
                description:
                    "\nHP IDS 280 Pro G8 Microtower PC Intel Core i7-11700 2.5Ghz, 8GB DDR4 2933MHz, 512GB M.2 2280 PCIe NVMe SSD, AMD Radeon RX550X 4GB, DVDRW, K&M, Win11 home\n\n\n\nҮйлдлийн систем\nWindows 11 Home\n\n\nПроцессор\nIntel® Core™ i7-11700 Processor (2.5Ghz up to 4.9Ghz, 16 MB Intel® Smart Cache)\n\n\nГрафик\nAMD Radeon RX 550X 4 GB Graphics card\n\n\nШуурхай санах ой\nDDR4 8Gb \n\n\nБагтаамж\n512GB M.2 2280 PCIe NVMe SSD\n\n\nLAN\nIntegrated 10 100 1000M GbE LAN\n\n\nАудио\nRealtek ALC3601\n\n\nОролт\n\n\n(2) USB 2.0 ports\n(2) USB 2.0 port (optional on select SKUs)\n(1) Ethernet RJ-45 port\n(1) Audio line-out\n(1) Audio line-in\n(1) VGA port (covered up when configured with processor without internal graphics)\n(1) HDMI port (covered up when configured with processor without internal graphics)\n\n\n\n\nХэмжээ\n\n15.54 x 30.30 x 33.73 cm (6.12 x 11.93 x 13.28 in)\n\n\n\nЖин\n4.7 kg (10.36 lb)\n\n\nБаталгаа\n12 Сар\n\n\n\n",
            },
        ],
        phones: [
            {
                productDisplayName: "Z Flip 6 512gb",
                productName: "SM-F741BZSHSKZ",
                price: 3999000,
                featured: true,
                description:
                    "Display size- 6,7 inch Resolution-1080 x 2640 pixels Хэмжээ, Жин: Unfolded: 165.1 x 71.9 x 6.9 mm Folded: 85.1 x 71.9 x 14.9 mm weight- 187gБаталгаа: Үйлдвэрийн 1 жилийн баталгааDisplay type- Foldable Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 1600 nits (peak)Үндсэн камер: 50 MP, f 1.8, 23mm (wide), 1.0µm, dual pixel PDAF, OIS 12 MP, f 2.2, 123˚ (ultrawide), 1.12µmВидео камер: 4K@30 60fps, 1080p@60 120 240fps, 720p@960fps, HDR10+Дэлгэцийн камер: 10 MP, f 2.2, 23mm (wide), 1.22µmДэлгэцийн видео камер: 4K@30fpsAndroid 14, One UI 6.1.1512GB4000mAh12GB  Qualcomm SM8650-AC Snapdragon 8 Gen 3 (4 nm)8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)Adreno 750 (1 GHz)GSM   CDMA   HSPA   EVDO   LTE   5G",
            },
            {
                productDisplayName: "iPhone 14 Midnight",
                productName: "MPUF3ZP A",
                price: 3899000,
                description:
                    "Багтаамж: 128GB\nӨнгө: Midnight\n\n15.40 см (6.1 инч) Super Retina XDR дэлгэц Ямар ч гэрэлд илүү сайн зураг авах дэвшилтэт камерын систем \nCinematic горим  4K Dolby Vision дээр секундэд 30 кадр хүртэл зориулсан үйлдлийн горим \nАюулгүй байдлын  технологи — Яаралтай тусламжийн үед тусламж дууддаг. технологитой. \n",
            },
        ],
        tvs: [
            {
                productDisplayName: 'Xiaomi TV Q2 65"',
                productName: "Xiaomi-tv-q2-65",
                price: 2499000,
                featured: true,
                description:
                    "Display type: QLEDResolution: 4K, 3840 × 2160Color gamut: DCI-P3 92% (typ)Color depth: 1.07 billion (8-bit + FRC)Refresh rate: 60HzMEMC: 60HzViewing angle: 178°(H)  178°(V)Supports Dolby Vision IQ, HDR 10, HLGSpeakerSpeaker (Sound Output): 15W + 15WSupports Dolby Atmos and DTS:XOperating SystemGoogle TVProcessor & StorageProcessor: MTK 9611CPU: Quad A55, up to 1.5GHzGPU: Mali G52RAM: 2GBStorage: 16GB eMMCConnectivityBluetooth: Bluetooth 5.0Wi-F: i2.4GHz 5GHzHDMI × 3 (1 port with eARC)USB 2.0 × 2Composite In: YesCI Slot*: YesEthernet (LAN): YesOptical Digital Audio Out: Yes3.5mm headphone jack: YesBroadcasting system: DVB-T2 C, DVB-S2**Vary by marketsDesignBezel-less designColor: GreyStand: Double metal standDimensionsDimensions including base (L × W × H): 1450.5 × 318.8 × 907.5mmDimensions not including base (L × W × H): 1450.5 × 87.3 × 843.7mmPackage size (L × W × H): 1600 × 164 × 960mmWeightWeight including base: 18.6KgWeight not including base: 18.2KgPackage weight: 25.3KgMaterialFrame: Aluminium-alloyBack cover: PlasticStand: MetalWall Mounting400 × 300mmPower & Operating environmentPower: 180WVoltage: 200-240V～50 60HzOperating temperature: 0°C ~ 40°C, Humidity: 20% ~ 80%Storage temperature: -15°C ~ 45°C, Relative humidity＜80%Package contentsRemote controlPower cableScrew bagStandUser manual Warranty card\n",
            },
            {
                productDisplayName: "Konka 65 inch 4K UHD Frameless Smart TV UDG65QR680ANT",
                productName: "22636",
                price: 1399900,
                description:
                    "Konka 65 inch 4K UHD Frameless Smart TV UDG65QR680ANT\nДэлгэц: LED, Хүрээгүй\nҮйлдлийн систем: Android\nНягтрал: 3840×2160 4К нягтаршил бүхий тод дүрслэл\nТехнологи: HDR технологи\nДэлгэцийн хурд: Motion Blur Compensation\nCPU: A55\nСпикер: 5Wx2 Excellent Surround Sound\nОролт: 3хHDMI, Сүлжээний оролт LAN network , AV оролт, AUDIO болон USB\nNetflix, YouTube, Prime video гэх мэт программууд албан ёсны лицензтэй, мөн татаж авах боломжтой 1000 гаруй программ бүхий app- тай",
            },
        ],
        laptops: [
            {
                productDisplayName:
                    "Acer Aspire 5 Steel Grey, 15.6 inch FHD Acer ComfyView LED LCD, i5-1335U, 8GB LPDDR5 Memory, 512GB SSD, FHD USB Camera, Windows 11 Home Single Language",
                productName: "101010110109624",
                price: 2110900,
                description: "",
                featured: true,
            },
            {
                productDisplayName:
                    "Acer Aspire 5 A515-58M-568U Steel Grey, Intel Core i5-1335U, 15.6 inch FHD1920x1080, 8GB LPDDR5 Memory, 256GB SSD, FHD USB Camera, WiFi 6, 50Wh, Acer Backpack 16 LZ.BPKM6.B05, Windows 11 Home Single Language",
                productName: "101010110112524",
                price: 2432100,
                description: "",
            },
            {
                productDisplayName:
                    "Acer Aspire 15 Steel Gray  Intel® Core™ 5-120U, 15.6 FHD 1920x1080 , 8GB of onboard LPDDR5 memory, 512GB PCIe Gen4 SSD, HD camera, Windows 11 Home Single Language- A15-51P-53SA",
                productName: "101010130085524",
                price: 2274900,
                description: "",
            },

            {
                productDisplayName:
                    "Acer Aspire 5 A515-58M-7138 Steel Grey, Intel Core i7-1355U, 15.6 inch FHD1920x1080, 8GB LPDDR5 Memory, 256GB SSD, FHD USB Camera, WiFi 6, 50Wh, Acer Backpack 16 LZ.BPKM6.B05, Windows 11 Home Single Language",
                productName: "101010110112624",
                price: 2948300,
                description: "",
            },
            {
                productDisplayName:
                    "ASUS ZenBook 14 UX434FQ-A5050T Intel core i5-10210U, 8GB DDR3 RAM, 512GB SSD, NVIDIA MX350 2GB, 14 inch, Win10 home with ScreenPad 2.0",
                productName: "18242",
                price: 2799900,
                description:
                    '\nASUS ZenBook 14 UX434FQ-A5050T Intel core i5-10210U, 8GB DDR3 RAM, 512GB SSD, NVIDIA MX350 2GB, 14 inch, Win10 home with ScreenPad 2.0\n\n\n\nҮйлдлийн систем\nWindows 10 Home\n\n\nПроцессор\nIntel® Core™ i5-10210U Processor 1.6 GHz (6M Cache, up to 4.2 GHz, 4 cores)\n\n\nГрафик\nIntel® UHD Graphics, NVIDIA® GeForce® MX350, 2GB GDDR5\n\n\nДэлгэц\n14.0-inch, FHD (1920 x 1080) 16:9 aspect ratio, IPS-level Panel, LED Backlit, 300nits, 100% sRGB color gamut, Anti-glare display, Screen-to-body ratio: 92%, ScreenPad™ 2.0 (FHD+ (2160 x 1080) IPS-level Panel)\n\n\nШуурхай санах ой\n8GB LPDDR3 on board\n\n\nБагтаамж\n512GB M.2 NVMe™ PCIe® 3.0 SSD\n\n\nОролт\n1x USB 2.0 Type-A1x USB 3.2 Gen 2 Type-A1x USB 3.2 Gen 2 Type-C1x HDMI 1.41x 3.5mm Combo Audio Jack1x Headphone out1x DC-inMicro SD card reader\n\n\nГар болон хулгана\nBacklit Chiclet Keyboard, 1.4mm Key-travel\n\n\nКамер\nHD camera with IR function to support Windows Hello\n\n\nАудио\nSonicMasterAudio by ICEpower®Built-in speakerBuilt-in array microphoneharman kardon (Premium)with Cortana and Alexa voice-recognition support\n\n\nУтасгүй холболт\n\nWi-Fi 5(802.11ac) (Dual band) 2*2 + Bluetooth 5\n\n\n\nБатарей\n\n50WHrs, 3S1P, 3-cell Li-ion\n\n\n\nЦэнэглэгч\n\nø4.0, 45W AC Adapter, Output: 19V DC, 2.37A, 45W, Input: 100~240V AC 50 60Hz universal\n\n\n\nЖин\n\n1.15 kg (2.54 lbs)\n\n\n\nХэмжээ\n\n31.90 x 19.90 x 1.69 ~ 1.82 cm (12.56" x 7.83" x 0.67" ~ 0.72")\n\n\n\nMyASUS Features\nAppDealsSystem diagnosisBattery health chargingFan ProfileSplendidTru2LifeFunction key lockWiFi SmartConnectLink to MyASUS\n\n\nХамгаалалтын зэрэг\nUS MIL-STD 810G military-grade standard\n\n\nБаталгаа\n12 сар\n\n\n\n',
            },
            {
                productDisplayName:
                    "ASUS Laptop 15 X515EA-TS2502W Intel core i5-1135G7, DDR4 8GB RAM, 512GB SSD, Intel Iris Xe Graphics, FHD 15.6 inch, Win11 home",
                productName: "18176",
                price: 2199900,
                description:
                    '\nASUS Laptop 15 X515EA-SG2502W Intel core i5-1135G7, DDR4 8GB RAM, 512GB SSD, Intel Iris Xe Graphics, FHD 15.6 inch, Win11 home\n\n\n\nҮйлдлийн систем\nWindows 11 Home\n\n\nПроцессор\nIntel® Core™ i5-1135G7 Processor 2.4 GHz (8M Cache, up to 4.2 GHz, 4 cores)\n\n\nГрафик\nIntel® Iris Xe Graphics\n\n\nДэлгэц\n15.6-inch, FHD (1920 x 1080) 16:9 aspect ratio, IPS-level Panel, LED Backlit, 60Hz refresh rate, 250nits, 45% NTSC color gamut, Anti-glare display, Screen-to-body ratio: 83 %\n\n\nШуурхай санах ой\n8GB DDR4\n\n\nБагтаамж\n512GB M.2 NVMe™ PCIe® 3.0 SSD\n\n\nОролт\n1x USB 3.2 Gen 1 Type-A1x USB 3.2 Gen 1 Type-C2x USB 2.0 Type-A1x HDMI 1.41x 3.5mm Combo Audio Jack1x DC-in\n\n\nГар болон хулгана\nChiclet Keyboard with Num-key, 1.4mm Key-travel, Touchpad\n\n\nКамер\n720p HD camera\n\n\nАудио\nSonicMasterBuilt-in speakerBuilt-in microphonewith Cortana support\n\n\nУтасгүй холболт\n\nWi-Fi 5(802.11ac) (Dual band) 1*1 + Bluetooth 4.1\n\n\n\nБатарей\n\n37WHrs, 2S1P, 2-cell Li-ion\n\n\n\nЦэнэглэгч\n\nø4.0, 45W AC Adapter, Output: 19V DC, 2.37A, 45W, Input: 100~240V AC 50 60Hz universal\n\n\n\nЖин\n\n1.80 kg (3.97 lbs)\n\n\n\nХэмжээ\n\n36.00 x 23.50 x 1.99 ~ 1.99 cm (14.17" x 9.25" x 0.78" ~ 0.78")\n\n\n\nMyASUS Features\nAppDealsSystem diagnosisBattery health chargingFan ProfileSplendidTru2LifeFunction key lockWiFi SmartConnectLink to MyASUS\n\n\nБаталгаа\n12 сар\n\n\n\n',
            },
            {
                productDisplayName:
                    'ASUS ROG STRIX SCAR 17 G733PZ-LL055W AMD R9-7945HX, DDR5 16GB RAM, 1TB M.2 NVMe PCIe 4.0 SSD, NV RTX4080 12Gb, 240Hz WQHD IPS 17.3", Win11 home',
                productName: "22150",
                price: 10999900,
                description:
                    '\nASUS ROG STRIX SCAR 17 G733PZ-LL055W AMD R9-7945HX, DDR5 16GB RAM, 1TB M.2 NVMe PCIe 4.0 SSD, NV RTX4080 12Gb, 240Hz WQHD IPS 17.3", Win11 home\n\n\n\nҮйлдлийн систем\nWindows 11 home\n\n\nПроцессор\nAMD Ryzen™ 9 7945HX Mobile Processor (16-core 32-thread, 64MB L3 cache, up to 5.4 GHz max boost)\n\n\nГрафик карт\nNVIDIA® GeForce RTX™ 4080 Laptop GPU ROG Boost: 2330MHz* at 175W (2280MHz Boost Clock+50MHz OC, 150W+25W Dynamic Boost) 12GB GDDR6\n\n\nДэлгэц\n17-inch WQHD 16:9 (2560 x 1440, WQHD), IPS-level, Anti-glare displayDCI-P3: 100.00%Refresh Rate: 240HzResponse Time: 3msG-SyncPantone ValidatedMUX Switch + NVIDIA® Advanced OptimusSupport Dolby Vision HDR : Yes\n\n\nШуурхай санах ой\n16GB DDR5-4800 SO-DIMM Max Capacity: 64GB Support dual channel memory\n\n\nБагтаамж\n1TB PCIe® 4.0 NVMe™ M.2 SSD\n\n\nI O Ports\n1x 3.5mm Combo Audio Jack1x HDMI 2.1 FRL2x USB 3.2 Gen 1 Type-A1x USB 3.2 Gen 2 Type-C support DisplayPort™   power delivery   G-SYNC1x USB 3.2 Gen 2 Type-C support DisplayPort™   G-SYNC1x 2.5G LAN port\n\n\nKeyboard and Touchpad\nBacklit Chiclet Keyboard Per-Key RGB Touchpad\n\n\nКамер\n720P HD camera\n\n\nАудио\nSmart Amp TechnologyDolby AtmosAI noise-canceling technologyHi-Res certificationBuilt-in array microphone2-speaker system with Smart Amplifier Technology\n\n\nУтасгүй сүлжээ\nWi-Fi 6E(802.11ax) (Triple band) 2*2 + Bluetooth® 5.3 Wireless Card (*Bluetooth® version may change with OS version different.)\n\n\nБатарей\n90WHrs, 4S1P, 4-cell Li-ion\n\n\nЦэнэглэгч\nø6.0, 330W AC Adapter, Output: 20V DC, 16.5A, 330W, Input: 100~240C AC 50 60Hz universal TYPE-C, 100W AC Adapter, Output: 20V DC, 5A, 100W, Input: 100~240V AC 50 60Hz universal\n\n\nХэмжээ\n39.5 x 28.2 x 2.34 ~ 2.83 cm (15.55" x 11.10" x 0.92" ~ 1.11")\n\n\nЖин\n3.00 Kg (6.61 lbs)\n\n\nAuro sync\nYes\n\n\nDevice Lightning\nAura Sync Light Bar\n\n\nXbox Game Pass\nXbox Game Pass Ultimate_3 months (*Terms and exclusions apply. Offer only available in eligible markets for Xbox Game Pass Ultimate. Eligible markets are determined at activation. Game catalog varies by region, device, and time.\n\n\nХамгаалалт\nBIOS Administrator Password and User Password ProtectionTrusted Platform Module (Firmware TPM)\n\n\nХайрцаг дотор\nROG backpackROG Fusion II 300ROG Gladius III Mouse P514TYPE-C, 100W AC Adapter, Output: 20V DC, 5A, 100W, Input: 100~240V AC 50 60Hz universal\n\n\n\n',
            },
            {
                productDisplayName:
                    'HP EliteBook 840 G9 Intel Core i5-1240P, DDR5 4800MHz 8GB RAM, 512GB PCIe NVMe M.2 SSD, Intel Iris Xe, 14" WUXGA LED, Win11 Home',
                productName: "19135",
                price: 3999900,
                description:
                    '\nHP EliteBook 840 G9 Intel Core i5-1240P, DDR5 4800MHz 8GB RAM, 512GB PCIe NVMe M.2 SSD, Intel Iris Xe, 14" WUXGA LED, Win11 Home\n\n\n\nҮйлдлийн систем\nWindows 11 Home\n\n\nПроцессор\nIntel® Core™ i5-1240P processor (up to 4.4 GHz max boost clock, 12 MB L3 cache, 12 cores)\n\n\nГрафик\nIntel Iris Xe Graphics\n\n\nДэлгэц\n14" diagonal WUXGA LED UWVA Anti-Glare (1920x1200)(250 Nits)\n\n\nШуурхай санах ой\n8 GB DDR5-4800 Sodimm\n\n\nБагтаамж\n512GB Intel® PCIe® NVMe™ M.2 SSD\n\n\nLAN\n-\n\n\nУтасгүй холболт\nIntel® AX211 Wi-Fi 6E and Bluetooth® 5.3 Combo, non-vPro\n\n\nЦэнэглэгч\n65 Watt nPFC USB-C Straight AC Adapter\n\n\nБатарей\nLong Life 51Whr Fast Charge 3 cell Battery\n\n\nОролт\n\n2 Thunderbolt™ 4 with USB4™ Type-C® 40Gbps signaling rate (USB Power Delivery, DisplayPort™ 1.4); 2 SuperSpeed USB Type-A 5Gbps signaling rate (1 charging); 1 HDMI 2.0; 1 AC power HDMI cable sold separately.\n\n\n\nКамер\nDual Array Microphone 5 MP Camera\n\n\nАудио\nAudio by Bang & Olufsen, dual stereo speakers, dual array world-facing microphones\n\n\nГар хулгана\nNotebook Keyboard, TouchPad\n\n\nХэмжээ\n12.42 x 8.82 x 0.76 in\n\n\nЖин\n2.99 lb\n\n\nБаталгаа\n36 сар\n\n\n\n',
            },
            {
                productDisplayName:
                    'HP ENVY 13-ba1522TU Intel Core i5-1135G7, DDR4 8GB RAM, 512GB PCIe NVMe M.2 SSD, Intel Iris Xe Graphics, 13.3" IPS FHD, Multi Touch, Win10 Home, Natural Silver',
                productName: "19140",
                price: 2799900,
                description:
                    '\nHP ENVY 13-ba1522TU Intel Core i5-1135G7, DDR4 8GB RAM, 512GB PCIe NVMe M.2 SSD, Intel Iris Xe Graphics, 13.3" IPS FHD, Multi Touch, Win10 Home, Natural Silver\n\n\n\nҮйлдлийн систем\nWindows 10 Home\n\n\nПроцессор\nIntel® Core™ i5-1135G7 (up to 4.2 GHz with Intel® Turbo Boost Technology, 8 MB L3 cache, 4 cores)\n\n\nГрафик\nIntel® Iris® Xe Graphics\n\n\nДэлгэц\n33.8 cm (13.3") diagonal, FHD (1920 x 1080), multitouch-enabled, IPS, edge-to-edge glass, micro-edge, 400 nits, 100% sRGB\n\n\nШуурхай санах ой\n8 GB DDR4-2933 MHz RAM (onboard)\n\n\nБагтаамж\n512GB Intel® PCIe® NVMe™ M.2 SSD\n\n\nLAN\n-\n\n\nУтасгүй холболт\nIntel® Wi-Fi CERTIFIED 6™ AX201 (2x2) and Bluetooth® 5 combo (Supporting Gigabit data rate)\n\n\nЦэнэглэгч\n65 W Smart AC power adapter\n\n\nБатарей\n3-cell, 51 Wh Li-ion polymer\n\n\nОролт\n1 Thunderbolt™ 4 with USB4™ Type-C® 40Gbps signaling rate (USB Power Delivery, DisplayPort™ 1.4, HP Sleep and Charge); 1 SuperSpeed USB Type-A 5Gbps signaling rate (HP Sleep and Charge); 1 SuperSpeed USB Type-A 5Gbps signaling rate; 1 AC smart pin; 1 headphone microphone combo\n\n\nКамер\nHP Wide Vision HD Camera with integrated dual array digital microphone\n\n\nАудио\nAudio by B&O; Dual speakers; HP Audio Boost\n\n\nГар хулгана\nNotebook Keyboard, TouchPad\n\n\nХэмжээ\n\n30.65 x 19.46 x 1.69 cm\n\n\n\nЖин\n1.30 kg\n\n\nБаталгаа\n12 сар\n\n\n\n',
            },
            {
                productDisplayName:
                    'HP Laptop 15s-eq2161AU AMD Ryzen5-5500U, DDR4 3200Mhz 8GB RAM, 512GB PCIe SSD, AMD Radeon Graphics, 15.6" FHD Antiglare IPS, Win11 Home, Natural Silver',
                productName: "19169",
                price: 2099900,
                description:
                    '\nHP Laptop 15s-eq2161AU AMD Ryzen5-5500U, DDR4 3200Mhz 8GB RAM, 512GB PCIe SSD, AMD Radeon Graphics, 15.6" FHD Antiglare IPS, Win11 Home, Natural Silver\n\n\n\nҮйлдлийн систем\nWindows 11 Home\n\n\nПроцессор\nAMD Ryzen™ 5 5500U (up to 4.0 GHz max boost clock, 8 MB L3 cache, 6 cores, 12 threads)\n\n\nГрафик\nAMD Radeon™ Graphics\n\n\nДэлгэц\n39.6 cm (15.6") diagonal, FHD (1920 x 1080), micro-edge, anti-glare, 250 nits, 45% NTSC\n\n\nШуурхай санах ой\n8 GB DDR4-3200 MHz RAM (1 x 8 GB)\n\n\nБагтаамж\n512GB Intel® PCIe® NVMe™ M.2 SSD\n\n\nLAN\n-\n\n\nУтасгүй холболт\nRealtek RTL8822CE 802.11a b g n ac (2x2) Wi-Fi® and Bluetooth® 5 combo\n\n\nЦэнэглэгч\n45 W Smart AC power adapter\n\n\nБатарей\n3-cell, 41 Wh Li-ion\n\n\nОролт\n\n1 SuperSpeed USB Type-C® 5Gbps signaling rate; 2 SuperSpeed USB Type-A 5Gbps signaling rate; 1 HDMI 1.4b; 1 AC smart pin; 1 headphone microphone combo\n\n\n\nКамер\nHP True Vision 720p HD camera with integrated dual array digital microphones\n\n\nАудио\n2 x 2W speakers\n\n\nГар хулгана\nFull-size keyboard with numeric keypad, HP Imagepad with multi-touch gesture support; Precision Touchpad Support\n\n\nХэмжээ\n35.85 x 24.2 x 1.79 cm \n\n\nЖин\n1.69 kg\n\n\nБаталгаа\n12 сар\n\n\n\n',
            },
            {
                productDisplayName:
                    'HP Pavilion 15-eg1123AU AMD Ryzen5-5500U, DDR4 3200Mhz 8GB RAM, 512GB PCIe SSD, AMD Radeon Graphics, 15.6" FHD, Win11 Home, Natural Silver',
                productName: "19205",
                price: 2499900,
                description:
                    '\nHP Pavilion 15-eg1123AU AMD Ryzen5-5500U, DDR4 3200Mhz 8GB RAM, 512GB PCIe SSD, AMD Radeon Graphics, 15.6" FHD, Win11 Home, Natural Silver\n\n\n\nҮйлдлийн систем\nWindows 11 Home\n\n\nПроцессор\nAMD Ryzen™ 5 5500U (up to 4.0 GHz max boost clock, 8 MB L3 cache, 6 cores, 12 threads)\n\n\nГрафик\nAMD Radeon™ Graphics\n\n\nДэлгэц\n15.6" diagonal, FHD (1920 x 1080), IPS, micro-edge, BrightView, 250 nits, 45% NTSC\n\n\nШуурхай санах ой\n8 GB DDR4-3200 MHz RAM (2 x 8 GB)\n\n\nБагтаамж\n512GB Intel® PCIe® NVMe™ M.2 SSD\n\n\nLAN\n-\n\n\nУтасгүй холболт\nRealtek RTL8822CE 802.11a b g n ac (2x2) Wi-Fi® and Bluetooth® 5 combo\n\n\nЦэнэглэгч\n45 W Smart AC power adapter\n\n\nБатарей\n3-cell, 41 Wh Li-ion\n\n\nОролт\n1 SuperSpeed USB Type-C® 10Gbps signaling rate (USB Power Delivery, DisplayPort™ 1.4, HP Sleep and Charge); 2 SuperSpeed USB Type-A 5Gbps signaling rate; 1 HDMI 2.0; 1 AC smart pin; 1 headphone microphone combo\n\n\nКамер\nHP True Vision 720p HD camera with integrated dual array digital microphones\n\n\nАудио\nAudio by B&O; Dual speakers; HP Audio Boost\n\n\nГар хулгана\nNotebook Keyboard, TouchPad\n\n\nХэмжээ\n36.02 x 23.4 x 1.79 cm\n\n\nЖин\n1.75 kg\n\n\nБаталгаа\n12 сар\n\n\n\n',
            },
            {
                productDisplayName: "Acer laptop",
                productName: "ACER-ANV15-51-59TJ",
                price: 4199900,
                description: 'Core i5-13420H 16GB 512SSD RTX3050 6GB 15.6" IPS 144Hz W11 2YБаталгаат хугацаа: 24 сар',
            },
            {
                productDisplayName: "Acer laptop",
                productName: "ACER-ANV15-51-78K3",
                price: 5199900,
                description: 'Core i7-13620H 16GB 512SSD RTX4050 6GB 15.6" IPS 144Hz W11 2YБаталгаат хугацаа: 24 сар',
            },
            {
                productDisplayName: "Acer laptop",
                productName: "ACER-AN16-41-R9K7",
                price: 5699900,
                description: 'Ryzen7-7840HS 16GB 512SSD RTX4050 6GB 16" WUXGA 165Hz W11 2YБаталгаат хугацаа: 24 сар',
            },
            {
                productDisplayName: "MACBOOK",
                productName: "APPL-MQKP3ZA",
                price: 5499900,
                description: 'MBA 8C Core M2 8GB 256GB 15.3"Өнгө: SpacegrayБаталгаат хугацаа: 12 сар',
            },
        ],
    },
};
