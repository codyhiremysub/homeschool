import React, { useState } from "react";
import { nanoid } from "nanoid";
import Modal from "../Modal";
import { PrimaryFilledButton } from "../Styled";
import stamp from "../../assets/dino1.png";
import GoalCompletionModal from "./GoalCompletionModal";
import GoalCreationModal from "./GoalCreationModal";
import GoalReplacementModal from "./GoalReplacementModal";

const Goal = ({ area, goal, refetch, actions, setOtherGoalArea }) => {
  const [modal, setModal] = useState();

  return (
    <>
      <div
        className={`flex justify-between border border-gray-500 ${
          goal?.action ? "bg-blue-300" : "bg-neutral-100"
        } p-2`}
      >
        <button
          onClick={() =>
            goal?.action ? setModal("Completing") : setModal("Creating")
          }
          type="button"
          className="text-left"
        >
          <div className="text-sm">{area || "Other"}</div>
          {goal?.action ? (
            <div className="text-2xl">{goal?.action}</div>
          ) : (
            <div className="text-neutral-400">
              Set your {area || "Other"} goal
            </div>
          )}
          <div>{goal?.research_question}</div>
          <div>
            {goal?.completions.map(() => (
              <img
                key={nanoid()}
                className="inline h-12 w-12"
                src={stamp}
                alt="sticker for completion"
              />
            ))}
          </div>
        </button>
        {goal?.action && (
          <PrimaryFilledButton
            onClick={() => {
              setModal("Replacing");
            }}
            type="button"
          >
            Replace
          </PrimaryFilledButton>
        )}
      </div>
      <Modal show={!!modal} onClose={() => setModal(false)}>
        {/* Updating goal action, Creating goal, Marking goal complete */}
        {modal === "Completing" && (
          <GoalCompletionModal
            goal={goal}
            setModal={setModal}
            refetch={refetch}
            area={area}
          />
        )}
        {modal === "Creating" && (
          <GoalCreationModal
            area={area}
            setOtherGoalArea={setOtherGoalArea}
            refetch={refetch}
            goal={goal}
            setModal={setModal}
            actions={actions}
          />
        )}
        {modal === "Replacing" && (
          <GoalReplacementModal
            area={area}
            setOtherGoalArea={setOtherGoalArea}
            refetch={refetch}
            goal={goal}
            setModal={setModal}
            actions={actions}
          />
        )}
      </Modal>
    </>
  );
};

export default Goal;
