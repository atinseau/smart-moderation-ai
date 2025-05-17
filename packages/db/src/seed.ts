import { prisma } from "."

async function main() {

  await prisma.platform.createMany({
    data: [
      {
        name: 'META',
        description: 'Connect to meta and get every post from your wall on facebook and instagram',
        label: 'Meta',
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
