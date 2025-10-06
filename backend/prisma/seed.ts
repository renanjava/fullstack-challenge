/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { TimeTrackersStub } from '../src/modules/time-trackers/stubs/time-trackers.stub';
import { UsersStub } from '../src/modules/users/stubs/users.stub';
import { CollaboratorsStub } from '../src/modules/collaborators/stubs/collaborators.stub';
import { ProjectsStub } from '../src/modules/projects/stubs/projects.stub';
import { TasksStub } from '../src/modules/tasks/stubs/tasks.stub';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const usersData = Array.from({ length: 20 }).map(() => {
    const userStub = new UsersStub();
    return {
      username: userStub.username,
      password: userStub.password,
    };
  });
  await prisma.users.createMany({ data: usersData, skipDuplicates: true });
  const users = await prisma.users.findMany();
  console.log(`✅ ${users.length} usuários criados.`);
  console.log({ users });

  const collaboratorsData = users.map((u) => {
    const collaboratorStub = new CollaboratorsStub();
    return {
      name: collaboratorStub.name,
      user_id: u.id,
    };
  });
  await prisma.collaborators.createMany({ data: collaboratorsData });
  const collaborators = await prisma.collaborators.findMany();
  console.log(`✅ ${collaborators.length} colaboradores criados.`);

  const projectsData = Array.from({ length: 20 }).map(() => {
    const projectsStub = new ProjectsStub();
    return {
      name: projectsStub.name,
    };
  });
  await prisma.projects.createMany({ data: projectsData });
  const projects = await prisma.projects.findMany();
  console.log(`✅ ${projects.length} projetos criados.`);

  const tasksData = Array.from({ length: 20 }).map(() => {
    const tasksStub = new TasksStub();
    return {
      name: tasksStub.name,
      description: tasksStub.description,
      project_id: faker.helpers.arrayElement(projects).id,
    };
  });

  await prisma.tasks.createMany({ data: tasksData, skipDuplicates: true });
  const tasks = await prisma.tasks.findMany();
  console.log(`✅ ${tasks.length} tarefas criadas.`);

  const validTimeTrackers: any[] = [];
  const MAX_RETRIES = 100;
  let attempts = 0;

  while (validTimeTrackers.length < 20 && attempts < MAX_RETRIES) {
    attempts++;

    const stub = new TimeTrackersStub();
    const collaborator = faker.helpers.arrayElement(collaborators);
    const task = faker.helpers.arrayElement(tasks);

    const conflict = await prisma.timeTrackers.findFirst({
      where: {
        collaborator_id: collaborator.id,
        start_date: { lt: stub.end_date },
        end_date: { gt: stub.start_date },
      },
    });

    if (!conflict) {
      try {
        const created = await prisma.timeTrackers.create({
          data: {
            start_date: stub.start_date,
            end_date: stub.end_date,
            timezone_id: stub.timezone_id,
            collaborator_id: collaborator.id,
            task_id: task.id,
          },
        });
        validTimeTrackers.push(created);
        console.log(
          `🕒 TimeTracker criado ${validTimeTrackers.length}/20 (tentativa ${attempts})`,
        );
      } catch (err) {
        console.warn('⚠️ Falha ao criar TimeTracker:', err.message);
      }
    } else {
      console.log('⏭️ Conflito detectado, gerando novo intervalo...');
    }
  }

  console.log(
    `✅ ${validTimeTrackers.length} time trackers válidos criados em ${attempts} tentativas.`,
  );

  console.log('🌾 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
