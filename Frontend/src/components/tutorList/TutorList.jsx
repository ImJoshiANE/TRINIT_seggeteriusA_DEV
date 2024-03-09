import React, { useContext } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import TutorCard from '../tutorCard/TutorCard'
import { TutorListContext } from '@/pages/HomePage';

const TutorList = () => {
  const {tutorList} = useContext(TutorListContext);
  return (
    <div className="w-full flex flex-col items-center justify-center mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center lg:w-[780px] xl:w-[1000px] my-10">
        {tutorList.map((tutor, i) => (
          <TutorCard key={i} tutor={tutor} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default TutorList