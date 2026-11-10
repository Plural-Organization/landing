import ProblemSwitch from "../islands/ProblemSwitch";
import P1Facts from "./problem/P1Facts";
import P2BeforeAfter from "./problem/P2BeforeAfter";
import P3TwoChats from "./problem/P3TwoChats";
import P4Story from "./problem/P4Story";
import P5Quote from "./problem/P5Quote";
import V6Timeline from "./problem/V6Timeline";
import { COPIES } from "./problem/copies";
import { STRUCTURES } from "./problem/Structures";
import { CLEAR } from "./problem/Clear";
import StepStory from "./problem/StepStory";

// The problem Plural exists for. Temporary: variants are compared with ?problem=<key>; 11..20 are copy versions of 2, 21..30 other structures.
export default function ContextProblem() {
  const variants: Record<string, React.ReactNode> = {
    "1": <P1Facts />, "2": <P2BeforeAfter />, "3": <P3TwoChats />, "4": <P4Story />, "5": <P5Quote />, "6": <V6Timeline />,
  };
  COPIES.forEach((copy, i) => { variants[String(11 + i)] = <P2BeforeAfter copy={copy} />; });
  STRUCTURES.forEach((S, i) => { variants[String(21 + i)] = <S />; });
  CLEAR.forEach((S, i) => { variants[String(31 + i)] = <S />; });
  variants["40"] = <StepStory />;
  return <ProblemSwitch variants={variants} initial="40" />;
}
