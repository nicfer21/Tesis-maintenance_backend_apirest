import 'dotenv/config';
import { PrismaClient, WorkerLevel } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { encryptPassword } from '../src/common/handlers/encrypt.handler';
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    await prisma.$connect();
    console.log('🌱 Comenzando con el seed de datos :');

    //Creación del administrador
    console.log('-> Creación del Admin usuario');

    const adminWorker = await prisma.worker.upsert({
      where: { id: 1 },
      update: {},
      create: {
        lastname: 'Cuenta',
        firstname: ' Administrador',
        dni: '00000000',
        ruc: '00000000000',
        email: 'correo@gmail.com',
        phone: '0123456789',
        worker_level: WorkerLevel.ADMIN,
        metadata: {
          comentario: 'Super Admin',
        },
      },
    });
    console.log(
      `   ✔ ${adminWorker.lastname} ${adminWorker.firstname} (ID: ${adminWorker.id})`,
    );

    const adminPassword = await prisma.credential.upsert({
      where: { id: 1 },
      update: {},
      create: {
        workerId: adminWorker.id,
        password: encryptPassword('1234'),
      },
    });

    const verifyEncrypt = adminPassword.password != '1234' ? 'OK' : 'Error';

    console.log(`   ✔ Password status : ${verifyEncrypt})`);

    //Creación del administrador
    console.log('-> Alta Jerarquía');

    const defaultIndustry = await prisma.industry.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Agroindustria',
        description:
          'La agroindustria es el conjunto de actividades que transforman los productos del campo en bienes elaborados, agregando valor y empleo. Se organiza en dos ramas principales: la alimentaria, que produce alimentos y bebidas como lácteos, carnes, harinas, aceites, conservas y panificación; y la no alimentaria, que genera productos no comestibles como textiles, cuero, papel, biocombustibles, cosméticos y fibras vegetales. En síntesis, la agroindustria conecta la producción agrícola con la industria, ya sea para el consumo humano o para usos distintos de la alimentación.',
      },
    });

    console.log(`   ✔ Se creo ${defaultIndustry.name}`);

    const defaultBusinessCategory = await prisma.business_category.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Industrias Alimentarias',
        description:
          'La industria alimentaria es la rama de la agroindustria dedicada a transformar materias primas agrícolas, pecuarias, pesqueras o forestales en productos destinados al consumo humano. Su función principal es garantizar que los alimentos lleguen al consumidor en condiciones seguras, nutritivas y con mayor valor agregado.',
        industryId: 1,
      },
    });

    console.log(`   ✔ Se creo ${defaultBusinessCategory.name}`);

    const defaultFacilities = await prisma.facilities.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Andean Roots SRL',
        description:
          'Andean Roots es una empresa peruana fundada en 2007 en Ambo, Huánuco. Se dedica a la producción de alimentos funcionales orgánicos derivados de la biodiversidad andina, como yacón, aguaymanto, papa amarilla, quinua y maíz morado. Trabaja junto a comunidades campesinas bajo un modelo de economía circular, con compromiso social y ambiental. Su misión es ofrecer productos de alta calidad y precio justo para mejorar la vida de las personas, y su visión es convertirse en líder en producción, comercialización e investigación de alimentos orgánicos en el Perú.',
        business_categoryId: 1,
      },
    });

    console.log(`   ✔ Se creo ${defaultFacilities.name}`);

    const defaultPlant = await prisma.plant.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Planta industrial 1',
        description:
          'Primera planta industrial que tiene procesa productos deshidratados y jarabe',
        facilitiesId: 1,
      },
    });

    console.log(`   ✔ Se creo ${defaultPlant.name}`);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
