import { useRef, useEffect, useState } from 'react';
import { Box, VStack, Heading, Text, Image, Flex, List } from '@chakra-ui/react';

const text1 = (
  <Text fontSize="lg">
    This section will include six muscle groups: the deltoids, lower, mid and upper back, triceps, and forearms. I chose to split the back into three
    groups rather than their individual muscles{' '}
    <u>(Latissimus dorsi, Levator scapulae, Rhomboids, Trapezius, Serratus posterior superior, Serratus posterior inferior)</u>, since they are always
    trained together.
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
  { id: 3, title: 'Musculus triceps brachii', text: 'This is the third section.', img: '/back_upper_back.PNG' },
  { id: 4, title: 'Section 1', text: 'This is the first section.', img: '/back_deltoids.PNG' },
  { id: 5, title: 'Section 2', text: 'This is the second section.', img: '/back_forearms.PNG' },
  { id: 6, title: 'Section 3', text: 'This is the third section.', img: '/back_upper_back.PNG' },
  {
    id: 8,
    title: 'Sources',
    text: '<ul><li><a href="https://my.clevelandclinic.org/health/body/21632-back-muscles">https://my.clevelandclinic.org/health/body/21632-back-muscles</a></li><li><a href="https://www.physio-pedia.com/Deltoid">https://www.physio-pedia.com/Deltoid</a></li>https://www.reddit.com/r/Fitness/comments/2xxa7l/deltoids_101_an_anatomical_guide_to_training/</ul>',
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
        threshold: 0.2,
      },
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  return (
    <Flex height="75vh">
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
          maxW="150%"
          maxH="150%"
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
