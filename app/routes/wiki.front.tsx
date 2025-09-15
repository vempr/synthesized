import { useRef, useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Image, Flex, List, Em, Link } from '@chakra-ui/react';
import type { Route } from './+types/wiki.front';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Synthesized | Muscle Composition Wiki: front.png' },
    {
      name: 'description',
      content: 'A website to showcase the natural muscles of humans, their functions and how to train them. Includes tracking and training logs!',
    },
  ];
}

const text1 = (
  <Text fontSize="lg">
    This section will include nine muscle groups:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>The neck</List.Item>
      <List.Item>Pectoral muscles</List.Item>
      <List.Item>Biceps</List.Item>
      <List.Item>Midsection muscles</List.Item>
      <List.Item>Gluteal muscles</List.Item>
      <List.Item>Quadriceps</List.Item>
      <List.Item>Hamstrings</List.Item>
      <List.Item>Calves</List.Item>
      <List.Item>And the tibialis</List.Item>
    </List.Root>
    <br />I chose to group the midsections muscles into one singular group rather than their individual muscles{' '}
    <Em>(Rectus Abdominis, Pyramidalis, External Obliques, Internal Obliques, Transversus Abdominis)</Em>
    , since they are always trained together.
    <br />
    <br />
    As usual, we will be covering their anatomy, functions as well as training insights.
  </Text>
);

const text2 = (
  <Text fontSize="lg">
    The muscles of the neck are muscles that cover the area of the neck. These muscles are mainly responsible for the movement of the head in all
    directions. They consist of 3 main groups of muscles: anterior, lateral and posterior groups, based on their position in the neck.
    <br />
    <br />
    The position of a muscle or group of muscles in the neck generally relates to the <b>function of the muscles</b>. For example, the muscles in the
    posterior neck are responsible for extension of the neck. The muscles of the neck are closely related to a number of important structures that
    pass between the thorax and the head, including major blood vessels, nerves and elements of the respiratory and gastrointestinal systems.
    <br />
    <br />
    Strengthening your neck muscles is an overlooked part of a training regimen. It insulates you from injuries during high-impact activities, and
    affects your upper body aesthetics. With the right bodyweight exercises, you can build a strong and healthy neck without the need for any
    equipment:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Rotation</List.Item>
      <List.Item>Side bending</List.Item>
      <List.Item>Forward bending</List.Item>
      <List.Item>Backward bending</List.Item>
    </List.Root>
    <br />
    Progression for neck training should be focused on <b>fatiguing the muscles</b> rather than maximum load. Therefore, prioritize training volume,
    slowing tempo and pauses, increasing ROM (range of motion), and shortening rest periods between sets.
  </Text>
);

const text3 = (
  <Text fontSize="lg">
    The pectoral muscles are a group of muscles in the chest that connect the upper arm and shoulder to the chest wall, primarily responsible for{' '}
    <b>moving the arm and stabilizing the scapula</b>. The two main muscles are the larger, superficial pectoralis major and the smaller, underlying
    pectoralis minor.
    <br />
    <br />
    Their functions include flexing, adducting, and internally rotating the arm, as well as contributing to breathing. Like the back muscles, strong
    chest muscles are important for good posture. And building up your chest muscles can help improve shoulder stability and reduce your risk of
    shoulder injury. Excellent choices for overall chest development include:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Pushups</List.Item>
      <List.Item>Barbell/Dumbbell Bench Press</List.Item>
      <List.Item>Cable Flies</List.Item>
      <List.Item>Incline presses</List.Item>
      <List.Item>Dips</List.Item>
    </List.Root>
    <br />
    Stretching exercises, such as chest stretch and doorway stretch, can help maintain flexibility and reduce the risk of injury.
  </Text>
);

const text4 = (
  <Text fontSize="lg">
    The biceps brachii (BB), commonly know as the biceps, is a large, thick muscle on the ventral portion of the upper arm. The muscle is composed of
    a short head and a long head. The long head is located on the lateral side of the biceps brachii while the short head is located on the medial
    side.
    <br />
    <br />
    The main functions of the biceps are the <b>flexion and supination</b> (outward rotation) of the forearm. Since the bicep is a relatively{' '}
    <Em>weak</Em> muscle, heavy pulling exercises (pullups, rows) will stimulate the muscle a good amount. Optionally, you can implement 1-2 isolation
    exercises for the biceps:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Bicep curls</List.Item>
      <List.Item>Hammer curls</List.Item>
      <List.Item>Preacher curls</List.Item>
    </List.Root>
  </Text>
);

const text5 = (
  <Text fontSize="lg">
    The abdominal muscles are the muscles forming the abdominal walls, the abdomen being the portion of the trunk connecting the thorax and pelvis.
    They support the trunk, allow movement, hold organs in place, and are distensible.
    <br />
    <br />
    The deep abdominal muscles, together with the intrinsic back muscles, make up the core muscles and help keep the body stable and balanced, and
    protects the spine. Causes of abdominal muscle strains include overstretching, overuse or a violent, poorly performed movement of the trunk,{' '}
    <b>improper technique</b> while playing sports that require running, turning, and jumping, lifting heavy objects, laughing, coughing, or sneezing.
    <br />
    <br />
    Variation in your stability training will ensure a good core:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>(Weighted) Crunches</List.Item>
      <List.Item>(Bar) Leg Raises</List.Item>
      <List.Item>Side Plank</List.Item>
      <List.Item>Russian Twist</List.Item>
      <List.Item>Vacuum Exercises</List.Item>
    </List.Root>
  </Text>
);

const text6 = (
  <Text fontSize="lg">
    The gluteal muscles are a group of muscles that make up the buttock area; the muscle group consists of the gluteus maximus, gluteus medius, and
    gluteus minimus. The <Em>gluteus maximus</Em> is the most superficial and largest of the three muscles and makes up the bulk of the shape and form
    of the buttock and hip area.
    <br />
    <br />
    Gluteus maximus is an <b>important muscle</b> for activities of daily living, displays of explosive athletic performance, and stability of certain
    joints in the body. It is as our most powerful hip extensor.
    <br />
    <br />
    In fact, with many of us spending more time desk-bound - which can wreak havoc on our hips and posture if we're not careful - research has shown
    that purposefully focusing on our glutes in the gym may be key to staying injury-free and reducing the chances of chronic pain in our backs and
    knees.
    <br />
    <br />
    The functions of all of the muscles that make up the glutes are very similar. This means that a movement that targets that glute maximus will also
    likely be hitting the medius and minimus, which simplifies training. Here are a few great exercises to target your glutes: To train your glutes,
    perform a combination of <b>compound movements</b> like squats and deadlifts, direct <b>hip extension</b> exercises such as hip thrusts and glute
    bridges, and <b>unilateral movements</b> like lunges and split squats.
  </Text>
);

const text7 = (
  <Text fontSize="lg">
    The quads, or quadriceps, are the four large muscles at the front of your thigh, consisting of the rectus femoris, vastus lateralis, vastus
    medialis, and vastus intermedius. They form the <b>bulk of your thigh</b> and are crucial for extending the knee, which allows you to perform
    everyday movements like walking, running, and kicking, and they attach to the patella (kneecap) by a common tendon.
    <br />
    <br />
    Here are the best exercises for stronger quads that you can choose from:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Barbell Squats</List.Item>
      <List.Item>Dumbbell Bulgarian Split Squat</List.Item>
      <List.Item>Leg Press</List.Item>
      <List.Item>Leg Extensions</List.Item>
    </List.Root>
  </Text>
);

const text8 = (
  <Text fontSize="lg">
    The muscles in the posterior compartment of the thigh are collectively known as the hamstrings. They collectively act to extend at the hip and
    flex at the knee.
    <br />
    <br />
    The hamstrings play an <b>important role</b> in almost every sport. They are particularly important in sports that require sprinting, tackling,
    jumping, quick changes of direction, and kicking movements. As a result, athletes often complain of <Em>injuries</Em> to this muscle group.
    <br />
    <br />
    To train your hamstrings, perform a mix of hip extension and knee flexion exercises, as these target the different hamstring muscles:
    <br />
    <br />
    <List.Root ml={4}>
      <List.Item>Romanian Deadlifts (RDLs)</List.Item>
      <List.Item>Good Mornings</List.Item>
      <List.Item>Lying Leg Curl</List.Item>
      <List.Item>Nordic Hamstring Curl</List.Item>
    </List.Root>
  </Text>
);

const text9 = (
  <Text fontSize="lg">
    Our calf muscle is in the back of your lower leg, behind your shin bone (tibia). It actually consists of three different muscles: your
    gastrocnemius, soleus and plantaris. Together, these lower leg muscles help you walk, run, jump, stand on your toes and flex your foot (push your
    toes down toward the ground).
    <br />
    <br />
    Your calf muscle supports you when you stand and enables you to move your foot and your lower leg. It propels you forward when you walk or run. It
    also allows you to jump, rotate your ankle, flex your foot and “lock” your knee.
    <br />
    <br />
    To train your calf muscles, perform variations of the calf raise, such as standing, seated, or single-leg versions, on a <b>raised platform</b> to
    increase the range of motion. Include <b>bent-knee variations</b> to target the soleus muscle, and try <b>plyometric exercises</b> like jump rope
    or lunge jumps to build strength and muscle definition.
  </Text>
);

const text10 = (
  <Text fontSize="lg">
    "Tibialis" refers to the tibia (shin bone) and the muscles associated with it, primarily the tibialis anterior and tibialis posterior. The
    tibialis anterior is on the front of the leg, lifting the foot upwards (dorsiflexion), while the tibialis posterior is deep in the back of the
    leg, supporting the arch of the foot and turning the sole inwards (inversion).
    <br />
    <br />
    Problems with these muscles can cause conditions like <Em>shin splints</Em> or <Em>foot arch weakness</Em>.
    <br />
    <br />
    Tibialis training strengthens the anterior tibialis muscle, located on the front of the shin, which helps improve ankle stability, and enhances
    athletic performance. Common exercises include heel walks, resistance band toe raises, wall tib raises, and weighted tibialis raises using a Tib
    Bar, a specialized device for adding weight.
  </Text>
);

const text11 = (
  <Text fontSize="lg">
    <List.Root ml={4}>
      <List.Item>
        <Link
          href="https://www.kenhub.com/en/library/anatomy/muscles-of-the-neck-an-overview"
          target="_blank"
          color="color"
          focusRing="none"
        >
          kenhub.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.health.harvard.edu/exercise-and-fitness/chest-workouts-exercises-for-strength-and-function"
          target="_blank"
          color="color"
          focusRing="none"
        >
          health.harvard.edu
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.surreyphysio.co.uk/top-5/top-5-exercises-for-ripped-pecs/"
          target="_blank"
          color="color"
          focusRing="none"
        >
          surreyphysio.co.uk
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.physio-pedia.com/Biceps_Brachii"
          target="_blank"
          color="color"
          focusRing="none"
        >
          physio-pedia.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.physio-pedia.com/Abdominal_Muscles"
          target="_blank"
          color="color"
          focusRing="none"
        >
          physio-pedia.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://www.physio-pedia.com/Gluteal_Muscles"
          target="_blank"
          color="color"
          focusRing="none"
        >
          physio-pedia.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://learn.athleanx.com/articles/legs-for-men/quad-workouts"
          target="_blank"
          color="color"
          focusRing="none"
        >
          learn.athleanx.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://rpstrength.com/blogs/articles/hamstring-hypertrophy-training-tips"
          target="_blank"
          color="color"
          focusRing="none"
        >
          rpstrength.com
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://my.clevelandclinic.org/health/body/21662-calf-muscle"
          target="_blank"
          color="color"
          focusRing="none"
        >
          my.clevelandclinic.org
        </Link>
      </List.Item>
      <List.Item>
        <Link
          href="https://en.wikipedia.org/wiki/Tibialis_anterior_muscle"
          target="_blank"
          color="color"
          focusRing="none"
        >
          en.wikipedia.org
        </Link>
      </List.Item>
    </List.Root>
  </Text>
);

const sectionsData = [
  {
    id: 1,
    title: 'Introduction to front.png',
    text: text1,
    img: '/front_empty.PNG',
  },
  {
    id: 2,
    title: 'Neck muscles',
    text: text2,
    img: '/front_neck.PNG',
  },
  {
    id: 3,
    title: 'Pectoral muscles',
    text: text3,
    img: '/front_chest.PNG',
  },
  {
    id: 4,
    title: 'Biceps Brachii',
    text: text4,
    img: '/front_biceps.PNG',
  },
  {
    id: 5,
    title: 'Midsection muscles',
    text: text5,
    img: '/front_mid_section.PNG',
  },
  {
    id: 6,
    title: 'Gluteal muscles',
    text: text6,
    img: '/front_glutes.PNG',
  },
  {
    id: 7,
    title: 'Quadriceps',
    text: text7,
    img: '/front_quads.PNG',
  },
  {
    id: 8,
    title: 'Hamstrings',
    text: text8,
    img: '/front_hamstrings.PNG',
  },
  {
    id: 9,
    title: 'Calves',
    text: text9,
    img: '/front_calves.PNG',
  },
  {
    id: 10,
    title: 'Tibialis',
    text: text10,
    img: '/front_tibialis.PNG',
  },
  {
    id: 11,
    title: 'Sources',
    text: text11,
    img: '/front_empty.PNG',
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
          lg={{ maxWidth: '100%', maxHeight: '100%' }}
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
