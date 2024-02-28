/**
 * ประเภทสถานะ
 */
export enum StatusEnum {
    /**
     * ใช้งาน
     */
    ACTIVE = 'active',
    /**
     * ไม่ใช้งาน
     */
    INACTIVE = 'inactive',
    /**
     * ลบข้อมูล
     */
    DELETE = 'delete',
    /**
     * ร่าง
     */
    DRAFT = 'draft'
}