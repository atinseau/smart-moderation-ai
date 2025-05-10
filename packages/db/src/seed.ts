import { prisma } from "."

async function main() {

  await prisma.platform.createMany({
    data: [
      {
        name: 'FACEBOOK',
        description: 'Connect to facebook and get every post from your wall',
        label: 'Facebook',
      }
    ]
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
