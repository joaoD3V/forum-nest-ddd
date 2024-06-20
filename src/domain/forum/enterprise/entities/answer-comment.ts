/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Comment, CommentProps } from './comment';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const anwserComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return anwserComment;
  }
}
