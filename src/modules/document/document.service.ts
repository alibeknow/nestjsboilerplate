import { Injectable } from '@nestjs/common';

import { setupSwagger } from '../../setup-swagger';
import type { Status } from './../../common/constants/status';
import { DocumentRepository } from './document.repository';
import type { DocumentDto } from './dto/document-dto';

@Injectable()
export class DocumentService {
  constructor(public readonly documentRepository: DocumentRepository) {}
  getDocuments() {
    return [
      {
        name: 'documentExample',
        uid: '2ec85ba3-fae9-46fc-bb2c-c485b5a6197d',
        body_html:
          '<xml><data>настоящим документ требует подписания тестовая инфа</data></xml>>',
        created: '2019-05-05',
      },
      {
        name: 'documentExample1',
        uid: '53325979-e974-47f5-a769-18d9be1f1258',
        body_html:
          '<xml><data>настоящим документ требует подписания тестовая инфа</data></xml>>',
        created: '2021-05-05',
      },
    ];
  }
  async getDocs(company): Promise<DocumentDto[] | DocumentDto> {
    const documents = await this.documentRepository.find({
      where: { company },
    });
    if (documents.length <= 0) {
      const document = this.documentRepository.create({
        name: 'Документ на подпись',
        body: '<xml><body>Документ настоящим сообщает что его надо подписать тестович тестоев</body></xml>',
        company,
      });
      await this.documentRepository.save(document);
      return document.toDto();
    }
    return documents.toDtos();
  }
  changeStatus(status: Status, companyId) {
    return this.documentRepository.update(
      {
        company: companyId,
      },
      {
        status,
      },
    );
  }
}
