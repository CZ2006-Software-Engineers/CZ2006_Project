import axios from "../axios";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdOutlineChat } from "react-icons/md";
import { createDirectChat } from "./Listing";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function BidModal({
  id,
  idx,
  open,
  setOpenBidModal,
  bidder,
  amount,
  closeListing,
  listingBids,
  setListingBids,
}) {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const closeModal = (idx) => {
    const newRules = Object.assign({}, open);
    newRules[idx] = false;
    setOpenBidModal(newRules);
  };
  const updateBidStatus = async (status) => {
    try {
      await axios.put(
        `/api/bids/${id}`,
        { status: status },
        { withCredentials: true }
      );
      if (status === "rejected") {
        const temp = listingBids.filter((bid) => bid.id !== id);
        setListingBids(temp);
      }
      closeModal(idx);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      centered
      show={open[idx]}
      onHide={() => {
        closeModal(idx);
      }}
    >
      <Modal.Body>
        <div>
          {bidder} has placed a bid of:
          <h3 className="text-center mt-3">${amount} SGD/mo</h3>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            className="me-2"
            onClick={async () => {
              const chatId = await createDirectChat(currentUser, [bidder]);
              navigate(`/chat/${chatId}`);
            }}
          >
            <MdOutlineChat size={"1.5rem"} />
          </Button>
          <Button
            className="me-2"
            variant="success"
            onClick={() => {
              updateBidStatus("approved");
              closeListing();
            }}
          >
            <AiOutlineCheck size={"1.5rem"} />
          </Button>
          <Button onClick={() => updateBidStatus("rejected")} variant="danger">
            <AiOutlineClose size={"1.5rem"} />
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <small>
          By accepting this offer, you are agreeing to the Terms and Conditions
          of our service as specified here.
        </small>
      </Modal.Footer>
    </Modal>
  );
}
