<?php

namespace App\Filament\Resources\ShoppeHelpdesks\Pages;

use App\Filament\Resources\ShoppeHelpdesks\ShoppeHelpdeskResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListShoppeHelpdesks extends ListRecords
{
    protected static string $resource = ShoppeHelpdeskResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
