import { useRef, useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Image, Flex, List, Em, Link } from '@chakra-ui/react';
import type { Route } from './+types/wiki.back';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Muscle Composition Wiki: back.png' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

const text1 = (
  <Text fontSize="lg">
    This section will include six muscle groups:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>The deltoids</List.Item>
      <List.Item>Triceps</List.Item>
      <List.Item>Forearms</List.Item>
      <List.Item>Lower,</List.Item>
      <List.Item>Middle,</List.Item>
      <List.Item>And upper back</List.Item>
    </List.Root>
    <br />I chose to split the back into three groups rather than their individual muscles{' '}
    <Em>(Latissimus dorsi, Levator scapulae, Rhomboids, Trapezius, Serratus posterior superior, Serratus posterior inferior)</Em>, since they are
    always trained together.
    <br />
    <br />
    As usual, we will be covering their anatomy, functions as well as training insights.
  </Text>
);

const text2 = (
  <Text fontSize="lg">
    The Deltoid muscle is a large triangular-shaped muscle that gives the shoulder its rounded contour. It is comprised of three distinct portions
    (anterior, middle, and posterior). The deltoid is a very powerful muscle and is used in many activities of daily living (e.g. putting clothes on,
    carrying shopping bags, washing hair) and many athletic activities (e.g. netball, swimming, water polo).
    <br />
    <br />
    Another lesser known function of the deltoids as a whole is to <u>prevent the dislocation</u> of the humerus (upper arm) when someone lifts heavy
    loads. Have you ever performed heavy shrugs, deadlifts, or farmer's walks, and noticed that your delts look huge while you're doing them? It's
    because they're working hard to make sure that the weight you're lifting doesn't rip your arm out of your socket.
    <br />
    <br />
    Due to their numerous functions, deltoids are involved in almost every upper body workout, and many lower body workouts as well. Since they are
    used so often, they are very easy to injure. It is very important to make sure you <b>warm up</b> and get blood flowing in your deltoids before
    you begin your workout so you can prevent injuries.
    <br />
    <br />
    (The anterior head of the deltoid is used very often in pressing movements. This includes bench press, and other chest movements that move in a
    similar plane. Due to this, many people do not think that isolation work for the anterior deltoid is necessary.)
    <br />
    <br />
    When training the deltoids through isolation work, most of people's time is spent on the lateral head. Training this part of the deltoid is what
    will give them that round look from the front, and will make them “pop”. This head is not worked during pressing movements to the extent that the
    anterior head is, so it's important to use isolation exercise to target it:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Lateral dumbbell raises</List.Item>
      <List.Item>Behind the back lateral cable raises</List.Item>
    </List.Root>
    <br />
    Remember that the function of the lateral deltoid is to raise the arm, when it is internally rotated. For raises, it is very important to use
    light weight and perform these in a higher rep range (10+).
    <br />
    <br />
    Many people believe that back training alone will target the posterior deltoid efficiently, but in order to fully develop the deltoid, you must
    work this head with isolation exercises. Neglecting posterior deltoid work can be detrimental to your shoulder health as well:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Rear Delt Flys</List.Item>
      <List.Item>Face Pulls</List.Item>
    </List.Root>
  </Text>
);

const text3 = (
  <Text fontSize="lg">
    The triceps brachii is a large, thick muscle on the dorsal part of the upper arm. It often appears as the shape of a horseshoe on the posterior
    aspect of the arm. The main function of the triceps is the <u>extension of the elbow joint</u>. The Triceps brachii gets its name with{' '}
    <Em>tri</Em> referring to "three" muscle heads or points of origin (with Brachii referring to the arm). These include the: Medial head, Lateral
    head, and Long head.
    <br />
    <br />
    Due to the diversity in muscle fibers that make up the triceps, it is very important to train them in <b>low, medium, and high rep ranges</b> to
    attain maximal growth (the medial head is used primarily for light/high rep exercises, the lateral head for heavy/low rep exercise, and the long
    head is used for all exercises).
    <br />
    <br />
    It is recommended to use compound movements to target your triceps. This is because using heavy weights for isolation exercises (such as skull
    crushers) can be very detrimental to your <u>elbow health</u>. Use compound movements for your heavier triceps training. The best compound
    movements for triceps growth are:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Close grip bench press</List.Item>
      <List.Item>Weighted dips</List.Item>
    </List.Root>
    <br />
    For your higher rep training, it is best to use isolation exercises. Favourites are:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Cable pushdowns</List.Item>
      <List.Item>Skull crushers</List.Item>
      <List.Item>Overhead dumbbell extensions</List.Item>
    </List.Root>
  </Text>
);

const text4 = (
  <Text fontSize="lg">
    The forearm is the segment of the arm from the elbow to the wrist, containing two bones, the radius and ulna, and more than{' '}
    <Em>twenty muscles</Em> divided into anterior (flexor) and posterior (extensor) compartments. These muscles control wrist, elbow, and finger
    movements, enabling complex fine motor actions.
    <br />
    <br />I don't think it's necessary to train forearms in isolation. A lot of biceps and back exercises will help you to train your forearms. Your
    forearms will be the limiting factor on a lot of your back/rowing exercises, especially when starting out, and they will just grow from doing
    those. However, I firmly believe that everyone should train their <b>grip</b>. It's great for forearm development, and it's one of the most
    functional aspects of strength that is rarely trained:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Farmer's carry</List.Item>
      <List.Item>Deadlift</List.Item>
      <List.Item>Any exercise hanging from a pullup bar</List.Item>
    </List.Root>
  </Text>
);

const text5 = (
  <Text fontSize="lg">
    The primary lower back muscles include the Erector Spinae, which extend and stabilize the spine; the Multifidus, deep muscles that stabilize the
    vertebrae; and the Quadratus Lumborum, which extends and side-bends the spine. Other significant muscles involved in lower back function are the
    Iliopsoas (hip flexor) and the Latissimus Dorsi, a large, flat muscle that helps with arm movement and trunk stability.
    <br />
    <br />
    These muscles work in conjunction with ligaments and tendons to provide strength, stability, and controlled movement for the entire trunk,
    connecting the upper body to the pelvis and legs. Weakness in these core muscles, particularly the erector spinae and multifidus, can
    significantly contribute to lower back pain:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Back extensions</List.Item>
      <List.Item>Squats</List.Item>
      <List.Item>Deadlifts</List.Item>
      <List.Item>Bridges/Hip Thrust</List.Item>
    </List.Root>
    <br />
    The stronger your glutes, the stronger your lower back.
  </Text>
);

const text6 = (
  <Text fontSize="lg">
    The primary middle back muscles are the <b>latissimus dorsi</b> (lats), the rhomboids, and the middle trapezius. These muscles work together to
    stabilize the spine, retract and stabilize the shoulder blades, and assist in pulling and upper-body movements like rowing and pulling.
    <br />
    <br />A stronger mid-back will help you maintain a more rigid and stable upper back during heavy pulls like deadlifts, carries, and rows. When you
    strengthen your middle back, you're better able to prevent rounding of your back under heavy loads.{' '}
    <u>Keeping your back flat is important for injury prevention and for stronger pulls.</u> Additionally, when your shoulders are retracted you can
    engage your lat muscles (your strongest back muscle) for pulling exercises, but when your shoulders are rounded forward because you lack mid back
    strength, you won't be able to engage your lats.
    <br />
    <br />
    To train your middle back, perform targeted exercises like:
    <List.Root ml={4}>
      <List.Item>Bent-over rows</List.Item>
      <List.Item>Deadlifts</List.Item>
      <List.Item>Pullups</List.Item>
    </List.Root>
    .. , focusing on squeezing the shoulder blades together at the peak of each rep.
  </Text>
);

const text7 = (
  <Text fontSize="lg">
    The primary upper back muscles are the trapezius. The trapezius is a large, V-shaped muscle from the neck to the lower back. Its functions include
    shrugging, moving the shoulder blades, and extending the head.
    <br />
    <br />
    The upper trapezius is a common area for <Em>pain and tightness</Em>, often caused by stress, tension, or poor posture from activities like desk
    work. To train your trapezius (trap) muscles, perform exercises like <b>barbell shrugs, face pulls, deadlifts, and reverse flies</b> to target
    different parts of the muscle and build strength. You can also use bodyweight exercises like pushups with a focus on shoulder movement. Remember
    to focus on proper form and light weights to ensure muscle activation and prevent injury.
  </Text>
);

const text8 = (
  <Text fontSize="lg">
    <List.Root ml={4}>
      <List.Item>
        <Link
          href="https://my.clevelandclinic.org/health/body/21632-back-muscles"
          target="_blank"
          color="color"
          focusRing="none"
        >
          my.clevelandclinic.org
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.physio-pedia.com/Deltoid"
          target="_blank"
          color="color"
          focusRing="none"
        >
          physio-pedia.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.reddit.com/r/Fitness/comments/2xxa7l/deltoids_101_an_anatomical_guide_to_training/"
          target="_blank"
          color="color"
          focusRing="none"
        >
          www.reddit.com/r/Fitness
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.reddit.com/r/Fitness/comments/2x4iwj/triceps_101_an_anatomical_guide_to_training/"
          target="_blank"
          color="color"
          focusRing="none"
        >
          www.reddit.com/r/Fitness
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://en.wikipedia.org/wiki/Forearm"
          target="_blank"
          color="color"
          focusRing="none"
        >
          en.wikipedia.org
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.spine-health.com/video/lumbar-muscle-anatomy-animation#:~:text=The%20lower%20back%20muscles%20work,front%20of%20the%20lumbar%20spine"
          target="_blank"
          color="color"
          focusRing="none"
        >
          spine-health.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.reddit.com/r/GYM/comments/ukvlce/how_do_i_develop_the_lower_back_muscles_like_i/"
          target="_blank"
          color="color"
          focusRing="none"
        >
          reddit.com/r/GYM
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href=" https://fitbod.me/blog/mid-back-exercises/"
          target="_blank"
          color="color"
          focusRing="none"
        >
          fitbod.me
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.physio-pedia.com/Trapezius"
          target="_blank"
          color="color"
          focusRing="none"
        >
          physio-pedia.com
        </Link>
      </List.Item>
    </List.Root>
  </Text>
);

const sectionsData = [
  {
    id: 1,
    title: 'Introduction to back.png',
    text: text1,
    img: '/back_empty.PNG',
  },
  {
    id: 2,
    title: 'Deltoids',
    text: text2,
    img: '/back_deltoids.PNG',
  },
  {
    id: 3,
    title: 'Musculus triceps brachii',
    text: text3,
    img: '/back_triceps.PNG',
  },
  {
    id: 4,
    title: 'Forearms',
    text: text4,
    img: '/back_forearms.PNG',
  },
  {
    id: 5,
    title: 'Lower Back',
    text: text5,
    img: '/back_lower_back.PNG',
  },
  {
    id: 6,
    title: 'Middle Back',
    text: text6,
    img: '/back_mid_back.PNG',
  },
  {
    id: 7,
    title: 'Upper Back',
    text: text7,
    img: '/back_upper_back.PNG',
  },
  {
    id: 8,
    title: 'Sources',
    text: text8,
    img: '/back_empty.PNG',
  },
];

export default function ScrollTextWithImage() {
  const [currentImg, setCurrentImg] = useState(sectionsData[0].img);
  const [fade, setFade] = useState(true);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFade(false);

            const target = entry.target as HTMLElement;
            const newImg = target.dataset.img;

            setTimeout(() => {
              if (newImg) {
                setCurrentImg(newImg);
              }
              setFade(true);
            }, 300);
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <Flex
      direction="column"
      lg={{ flexDirection: 'row' }}
      height="75vh"
    >
      <Box
        flex="1"
        position="sticky"
        top="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={currentImg}
          alt="Side"
          maxW="90%"
          maxH="90%"
          lg={{ maxWidth: '150%', maxHeight: '150%' }}
          transition="opacity 0.3s ease"
          opacity={fade ? 1 : 0}
        />
      </Box>

      <Box
        flex="2"
        overflowY="scroll"
        p={8}
      >
        {sectionsData.map((section, index) => (
          <Box
            key={section.id}
            data-img={section.img}
            ref={(el: HTMLElement | null) => (sectionRefs.current[index] = el)}
            minHeight="60vh"
            mb={8}
            overflowWrap="normal"
          >
            <VStack align="start">
              <Heading
                size="2xl"
                as="h2"
              >
                {section.title}
              </Heading>
              {section.text}
            </VStack>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}
